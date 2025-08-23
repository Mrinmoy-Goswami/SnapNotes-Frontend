import Container from '@/components/ui/Container';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import { ApiURL } from '@/constants/ApiURI';


interface SignedUrlResponse{
 data:{uploadUrl : string,
  key: string
}
}



const UploadFileForm = () => {
 const [files, setFiles] = useState<File | null | FileList>(null);

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
    <Container className='flex h-full items-center mt-10 justify-center'>
        <form onSubmit={handleUpload} className='shadow-md dark:shadow-darkShadow'>
      <input className='p-2 bg-lightCard rounded-md mx-2' type='file'  onChange={handleFileSelect}/>
      <button className='bg-buttonLightBg dark:bg-buttonDark text-darkText dark:bg-buttonDarkBg dark:text-lightText cursor-pointer hover:bg-lightAccent
      dark:hover:bg-gray-400
      font-bold  p-2 '>Upload</button>
        </form>
    </Container>
    
  )
}

export default React.memo(UploadFileForm)
