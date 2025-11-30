import Container from "@/components/ui/Container";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { ApiURL } from "@/constants/ApiURI";
import Lottie from "lottie-react";
import loader from "../../assets/loader.json";
import { useAuth } from "react-oidc-context";
import { MAX_FILE_SIZE, prompts, styles, validateFile } from '../../constants/constants';
import FormattedDisplay from "../components/FormattedDisplay";
import { useLoader } from "@/context/LoaderContext";
import { toast } from "sonner"

interface SignedUrlResponse {
  uploadUrl: string;
  key: string;
}

interface TextractResponse {
  s3Key: string;
  extractedTextLength : number,
  modelUsed: string,
  geminiResponse : string
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
      if(selectedFile.size > MAX_FILE_SIZE){
        toast.error("File size exceeds the maximum limit of 2 MB.");
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
    onError: (err : AxiosError) => {
      console.log("ERR",err)
      toast.error(`Failed to upload file`);
      hideLoader();
    },
  });

  // 📘 Textract call → only on Short Notes button click
  const textractMutation = useMutation({
    mutationFn: async ({s3Key,promptType,userId} : {s3Key : string,promptType : string, userId: string | null} ) => {
      const res = await axios.post(ApiURL.GET_TEXTRACT_DATA, { s3Key: s3Key, promptType : promptType,userId : userId }) as AxiosResponse<TextractResponse>;
      return res.data.geminiResponse;
    },
    onSuccess: (text) => {
      setExtractedText(text);
      toast.success("Notes generateed. You're welcome, productivity hero!");
    },
    onError: () => {
      toast.error("Failed to extract text, please try again.");
    },
  });
  const handleFileInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const { valid, error } = validateFile(file);

    if (!valid) {
      toast.error(error);
      e.target.value = ""; 
      return;
    }
    else{
      setFiles(e.target.files)
      setS3Key("")
    }
  }
// console.log("EXTRACTED:",extractedText)
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    showLoader("Uploading ...");
    await uploadFileMutation.mutateAsync(files[0]);
    hideLoader()
  };

  const handleShortNotes = async () => {
    if (!s3Key) {
      toast("Please upload a file first.",{
        description: "Short Notes generation requires an uploaded file.",
      });
      return;
    }
    try {
      showLoader("Generating short notes...")
      await textractMutation.mutateAsync({s3Key : s3Key, promptType : prompts.SHORT_NOTES, userId : USER_ID});
    } finally{
      hideLoader()
    }
  };

  const handleDeepNotes = async () => {
    if (!s3Key) {
      toast("Please upload a file first.");
      return;
    }
    try{
      showLoader("Generating deep notes...")
     await textractMutation.mutateAsync({s3Key : s3Key, promptType : prompts.DEEP_NOTES,userId : USER_ID});
    }finally{
      hideLoader()
    }
  };
  const handleMcqs = async () => {
    if (!s3Key) {
      toast("Please upload a file first.");
      return;
    }
    try{
      showLoader("Generating mcqs")
      await textractMutation.mutateAsync({s3Key : s3Key, promptType : prompts.QUIZ,userId : USER_ID});
    } finally{
      hideLoader()
    }
  };

  return (
    <Container className="flex h-full items-center flex-col justify-center mt-12 px-4">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-xl p-8 rounded-2xl bg-[var(--color-lightBg)] dark:bg-[var(--color-darkBg)] shadow-lg flex flex-col gap-6 items-center"
      >
        <h2 className="text-2xl font-bold text-center">Upload Your Notes</h2>

        {/* File input */}
        <label className="w-full flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800 transition">
          <input
            type="file"
            className="hidden"
            accept="application/pdf, image/*"
            onChange={handleFileInput}
            disabled={uploadFileMutation.isPending}
          />
          <span className="text-sm font-medium">
            {files?.[0]?.name ?? "Click to choose a file"}
          </span>
        </label>

        {/* Upload button */}
        <button
          type="submit"
          disabled={uploadFileMutation.isPending || !!s3Key}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {uploadFileMutation.isPending ? (
              <Lottie animationData={loader} size={1} loop autoplay />
          ) : (
            "Upload"
          )}
        </button>

        {/* Action buttons */}
        <div className="w-full flex flex-row justify-between sm:flex-row gap-4 mt-6">
          <button
            type="button"
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            onClick={handleShortNotes}
            disabled={textractMutation.isPending}
          >
            {textractMutation.isPending ? (
              <span className="w-6 h-6">
                <Lottie animationData={loader} size={styles.loaderSize} loop autoplay />
              </span>
            ) : (
              "Short Notes"
            )}
          </button>

          <button
            type="button"
            onClick={handleDeepNotes}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            Deep Notes
          </button>

          <button
            type="button"
            onClick={handleMcqs}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            Practice Quiz
          </button>
        </div>

        {/* Extracted Text */}
      </form>
      {extractedText && (
        <FormattedDisplay displayNotes={extractedText}>

        </FormattedDisplay>
      )}
    </Container>
  );
};

export default React.memo(UploadFileForm);
