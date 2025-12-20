import Container from "@/components/ui/Container";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { ApiURL } from "@/constants/ApiURI";
import Lottie from "lottie-react";
import loader from "../../assets/loader.json";
import { useAuth } from "react-oidc-context";
import { MAX_FILE_SIZE, prompts, validateFile } from '../../constants/constants';
import FormattedDisplay from "../components/FormattedDisplay";
import { useLoader } from "@/context/LoaderContext";
import { toast } from "sonner";
import { Upload, FileText, BookOpen, Brain } from "lucide-react";
import {PDFDocument} from 'pdf-lib';

interface SignedUrlResponse {
  uploadUrl: string;
  key: string;
}

interface TextractResponse {
  s3Key: string;
  extractedTextLength: number;
  modelUsed: string;
  geminiResponse: string;
}

const UploadFileForm = () => {
  const { showLoader, hideLoader } = useLoader();
  const auth = useAuth();
  const [files, setFiles] = useState<File[] | null | FileList>(null);
  const [s3Key, setS3Key] = useState("");
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const USER_ID = auth.user?.profile?.sub || null;

  // 📤 Upload file → get S3 key
  const uploadFileMutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      if (selectedFile.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds the maximum limit of 2 MB.");
      }
      if(selectedFile.type === "application/pdf"){
        const arrayBufferFile = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBufferFile);
        if(pdfDoc.getPageCount() > 5) {
          throw new Error("PDF exceeds the maximum page limit of 5 pages.");
        }
      }
      const res = await axios.post(
        ApiURL.GET_S3_SIGNED_URL,
        {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      ) as AxiosResponse<SignedUrlResponse>;

      const { key, uploadUrl } = res.data;

      await axios.put(uploadUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
      });

      return key;
    },
    onSuccess: (key) => {
      setS3Key(key);
      toast.success("File uploaded successfully!");
    },
    onError: (err: AxiosError) => {
      console.log("ERR", err);
      toast.error(err.message || `Failed to upload file`);
      hideLoader();
    },
  });

  // 📘 Textract call → only on Short Notes button click
  const textractMutation = useMutation({
    mutationFn: async ({ s3Key, promptType, userId }: { s3Key: string; promptType: string; userId: string | null }) => {
      const res = await axios.post(ApiURL.GET_TEXTRACT_DATA, { s3Key: s3Key, promptType: promptType, userId: userId }) as AxiosResponse<TextractResponse>;
      return res.data.geminiResponse;
    },
    onSuccess: (text) => {
      setExtractedText(text);
      toast.success("Notes generated. You're welcome, productivity hero!");
    },
    onError: () => {
      toast.error("Failed to extract text, please try again.");
    },
  });

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const { valid, error } = validateFile(file);

    if (!valid) {
      toast.error(error);
      e.target.value = "";
      return;
    } else {
      setFiles(e.target.files);
      setS3Key("");
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    showLoader("Uploading ...");
    await uploadFileMutation.mutateAsync(files[0]);
    hideLoader();
  };

  const handleShortNotes = async () => {
    if (!s3Key) {
      toast("Please upload a file first.", {
        description: "Short Notes generation requires an uploaded file.",
      });
      return;
    }
    try {
      showLoader("Generating short notes...");
      await textractMutation.mutateAsync({ s3Key: s3Key, promptType: prompts.SHORT_NOTES, userId: USER_ID });
    } finally {
      hideLoader();
    }
  };

  const handleDeepNotes = async () => {
    if (!s3Key) {
      toast("Please upload a file first.");
      return;
    }
    try {
      showLoader("Generating deep notes...");
      await textractMutation.mutateAsync({ s3Key: s3Key, promptType: prompts.DEEP_NOTES, userId: USER_ID });
    } finally {
      hideLoader();
    }
  };

  const handleMcqs = async () => {
    if (!s3Key) {
      toast("Please upload a file first.");
      return;
    }
    try {
      showLoader("Generating mcqs");
      await textractMutation.mutateAsync({ s3Key: s3Key, promptType: prompts.QUIZ, userId: USER_ID });
    } finally {
      hideLoader();
    }
  };

  return (
    <Container className="flex h-full items-center flex-col justify-center mt-12 px-4">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-2xl p-8 rounded-lg bg-card border border-border shadow-lg flex flex-col gap-6 items-center"
      >
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-foreground mb-2">Upload Your Notes</h2>
          <p className="text-muted-foreground">PDF or image files accepted (max 2MB)</p>
        </div>

        {/* File input */}
        <label className="w-full flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 transition-all duration-300 group">
          <input
            type="file"
            className="hidden"
            accept="application/pdf, image/*"
            onChange={handleFileInput}
            disabled={uploadFileMutation.isPending}
          />
          <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="text-center">
            <span className="text-sm font-medium text-foreground block">
              {files?.[0]?.name ?? "Click to choose a file"}
            </span>
            {!files && (
              <span className="text-xs text-muted-foreground mt-1 block">
                or drag and drop
              </span>
            )}
          </div>
        </label>

        {/* Upload button */}
        <button
          type="submit"
          disabled={uploadFileMutation.isPending || !!s3Key}
          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {uploadFileMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Lottie animationData={loader} style={{ width: 24, height: 24 }} loop autoplay />
              <span>Uploading...</span>
            </div>
          ) : s3Key ? (
            "✓ File Uploaded"
          ) : (
            "Upload File"
          )}
        </button>

        {/* Divider */}
        {s3Key && (
          <div className="w-full flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground font-medium">Generate Notes</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
        )}

        {/* Action buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border-2 border-border text-foreground font-semibold hover:border-primary hover:bg-muted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleShortNotes}
            disabled={textractMutation.isPending || !s3Key}
          >
            {textractMutation.isPending ? (
              <Lottie animationData={loader} style={{ width: 24, height: 24 }} loop autoplay />
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Short Notes</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDeepNotes}
            disabled={!s3Key}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border-2 border-border text-foreground font-semibold hover:border-primary hover:bg-muted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Brain className="w-5 h-5" />
            <span>Deep Notes</span>
          </button>

          <button
            type="button"
            onClick={handleMcqs}
            disabled={!s3Key}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border-2 border-border text-foreground font-semibold hover:border-primary hover:bg-muted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BookOpen className="w-5 h-5" />
            <span>Practice Quiz</span>
          </button>
        </div>

        {/* Success indicator */}
        {s3Key && (
          <div className="w-full p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success text-center font-medium">
              ✓ File ready! Choose an option above to generate your notes
            </p>
          </div>
        )}
      </form>

      {/* Extracted Text */}
      {extractedText && <FormattedDisplay displayNotes={extractedText} />}
    </Container>
  );
};

export default React.memo(UploadFileForm);