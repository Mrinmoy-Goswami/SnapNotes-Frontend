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

const UploadFileForm = () => {
  const auth = useAuth();
  const [files, setFiles] = useState<File[] | null | FileList>(null);

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    uploadFiles.mutate(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const uploadFiles = useMutation({
    mutationFn: async (selectedFile: File) => {
      try {
        // 1. Get signed URL
        const signedUrl = await axios.post(
          ApiURL.GET_S3_SIGNED_URL,
          {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.user?.access_token}`, // important
            },
          }
        ) as AxiosResponse<SignedUrlResponse>;

        // 2. Upload file directly to S3
        const res = await axios.put(signedUrl.data.uploadUrl, selectedFile, {
          headers: { "Content-Type": selectedFile.type },
        });

        console.log("✅ Uploaded:", res);
      } catch (error) {
        console.error("❌ Upload failed", error);
      }
    },
  });

  return (
    <Container className="flex h-full items-center justify-center mt-12 px-4">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-xl p-8 rounded-2xl 
                   bg-[var(--color-lightBg)] dark:bg-[var(--color-darkBg)] 
                   text-[var(--color-lightText)] dark:text-[var(--color-darkText)] 
                   shadow-lg dark:shadow-[0_0_20px_var(--color-darkShadow)] 
                   flex flex-col gap-6 items-center"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold font-header text-center">
          Upload Your Notes
        </h2>
        <p className="text-[var(--color-lightSecondary)] dark:text-[var(--color-darkSecondary)] font-body text-center text-sm">
          Upload PDFs, Docs, or images of your handwritten notes.  
          Snapnotes will summarize, make short notes or generate deep notes.
        </p>

        {/* File Input */}
        <label
          className="w-full flex flex-col items-center justify-center gap-3 p-6 
                     border-2 border-dashed rounded-xl cursor-pointer 
                     border-[var(--color-lightSecondary)] dark:border-[var(--color-darkSecondary)] 
                     hover:bg-[var(--color-lightAccent)/10] dark:hover:bg-[var(--color-darkAccent)/20] 
                     transition"
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploadFiles.isPending}
          />
          <span className="text-sm font-medium">
            {files?.[0]?.name ?? "Click to choose a file"}
          </span>
        </label>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={!files || uploadFiles.isPending}
          className="relative flex items-center justify-center gap-2 
                     bg-[var(--color-buttonLightBg)] dark:bg-purple-600 
                     text-white dark:text-[var(--color-darkText)] 
                     font-semibold px-6 py-3 rounded-lg 
                     hover:opacity-90 
                     transition-all duration-300 ease-in-out 
                     shadow-md hover:shadow-lg 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadFiles.isPending ? (
            <span className="w-6 h-6 dark:text-white light:text:black">
              <Lottie animationData={loader} loop autoplay />
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </Container>
  );
};

export default React.memo(UploadFileForm);
