import Container from '@/components/ui/Container';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import { ApiURL } from '@/constants/ApiURI';
import Lottie from "lottie-react";
import loader from '../../assets/loader.json'
import { useAuth } from 'react-oidc-context';


interface SignedUrlResponse{
 data:{uploadUrl : string,
  key: string
}
}



const UploadFileForm = () => {
 const [files, setFiles] = useState<File | null | FileList>(null);

const user = useAuth();
console.log("USER",user)
  const handleUpload = (e :React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(files[0])
      if (!files) return;

    // Trigger the mutation with selected files
    uploadFiles.mutate(files[0] );
  }
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    console.log(e.target.files)
    setFiles(e.target.files)
    console.log("FILES",files)
  }
  
  const uploadFiles = useMutation({
     mutationFn:async (selectedFile : File )=>{
        try {
          const signedUrl = await axios.post(ApiURL.GET_S3_SIGNED_URL,{
          fileName:selectedFile.name,
          fileType:selectedFile.type
        }) as AxiosResponse<SignedUrlResponse>
        //  const res = await axios.put(signedUrl.data as AxiosResponse<SignedUrlResponse>,{
        //   fileName:selectedFile.name,
        //       fileType:selectedFile.type
        //  })
        const res = await axios.put(signedUrl.data.uploadUrl)
        console.log("RESPONSE",res)
          
        } catch (error) {
          console.log("ERROR",error)
        }
  } })
  return (
<Container className="flex  h-full items-center justify-center mt-10">
  <form
    onSubmit={handleUpload}
    className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-md 
               shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] 
               flex flex-col md:flex-row gap-4 items-center"
  >
    {/* File Input */}
    <input
      className="p-2 border border-gray-300 dark:border-gray-600 
                 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                 rounded-md cursor-pointer focus:ring-2 focus:ring-cyan-400 
                 disabled:opacity-50"
      type="file"
      onChange={handleFileSelect}
      disabled={uploadFiles.isPending}
    />

    {/* Upload Button */}
    <button
      className="relative flex items-center justify-center gap-2 
                 bg-cyan-400 dark:bg-cyan-500 text-black dark:text-white 
                 font-semibold px-6 py-2 rounded-lg 
                 hover:bg-cyan-300 dark:hover:bg-cyan-400 
                 transition-all duration-300 ease-in-out 
                 shadow-md hover:shadow-lg 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!files || uploadFiles.isPending}
      type="submit"
    >
      {uploadFiles.isPending ? (
        <span className="w-6 h-6">
          <Lottie animationData={loader} loop autoplay />
        </span>
      ) : (
        "Upload"
      )}
    </button>
  </form>
</Container>

    
  )
}

export default React.memo(UploadFileForm)
// function useReactOidc(): { oidcUser: unknown; } {
//   throw new Error('Function not implemented.');
// }

