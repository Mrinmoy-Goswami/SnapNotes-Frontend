import Container from "@/components/ui/Container";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { ApiURL } from "@/constants/ApiURI";
import Lottie from "lottie-react";
import loader from "../../assets/loader.json";
import { useAuth } from "react-oidc-context";

interface SignedUrlResponse {
  uploadUrl: string;
  key: string;
}

interface TextractResponse {
  s3Key: string;
  extractedText: string;
}

const UploadFileForm = () => {
  const auth = useAuth();
  const [files, setFiles] = useState<File[] | null | FileList>(null);
  const [s3Key, setS3Key] = useState("");
  const [extractedText, setExtractedText] = useState<string | null>(null);

  // 📤 Upload file → get S3 key
  const uploadFileMutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      const res = await axios.post(
        ApiURL.GET_S3_SIGNED_URL,
        {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
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
      alert("File uploaded successfully!");
    },
    onError: () => {
      alert("Failed to upload file");
    },
  });

  // 📘 Textract call → only on Short Notes button click
  const textractMutation = useMutation({
    mutationFn: async (key: string) => {
      const res = await axios.post(ApiURL.GET_TEXTRACT_DATA, { s3Key: key }) as AxiosResponse<TextractResponse>;
      return res.data.extractedText;
    },
    onSuccess: (text) => {
      setExtractedText(text);
      alert("Text extracted successfully!");
    },
    onError: () => {
      alert("Failed to extract text");
    },
  });

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    await uploadFileMutation.mutateAsync(files[0]);
  };

  const handleShortNotes = async () => {
    if (!s3Key) {
      alert("Please upload a file first.");
      return;
    }
    await textractMutation.mutateAsync(s3Key);
  };

  return (
    <Container className="flex h-full items-center justify-center mt-12 px-4">
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
            onChange={(e) => setFiles(e.target.files)}
            disabled={uploadFileMutation.isPending}
          />
          <span className="text-sm font-medium">
            {files?.[0]?.name ?? "Click to choose a file"}
          </span>
        </label>

        {/* Upload button */}
        <button
          type="submit"
          disabled={uploadFileMutation.isPending}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {uploadFileMutation.isPending ? (
            <span className="w-6 h-6">
              <Lottie animationData={loader} loop autoplay />
            </span>
          ) : (
            "Upload"
          )}
        </button>

        {/* Action buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            className="flex-1 px-4 py-3 rounded-lg font-semibold bg-[var(--color-lightAccent)] text-white hover:opacity-90 transition"
            onClick={handleShortNotes}
            disabled={textractMutation.isPending}
          >
            {textractMutation.isPending ? (
              <span className="w-6 h-6">
                <Lottie animationData={loader} size={20} loop autoplay />
              </span>
            ) : (
              "Short Notes"
            )}
          </button>

          <button
            type="button"
            className="flex-1 px-4 py-3 rounded-lg font-semibold bg-green-500 text-white hover:opacity-90 transition"
          >
            Deep Notes
          </button>

          <button
            type="button"
            className="flex-1 px-4 py-3 rounded-lg font-semibold bg-orange-500 text-white hover:opacity-90 transition"
          >
            Practice
          </button>
        </div>

        {/* Extracted Text */}
        {extractedText && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-full text-sm overflow-y-auto max-h-60">
            {extractedText}
          </div>
        )}
      </form>
    </Container>
  );
};

export default React.memo(UploadFileForm);
