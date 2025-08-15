import Container from '@/components/ui/Container';
import React from 'react'



const UploadFileForm = () => {
    const handleUpload = (e :React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(e.target)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        console.log(e.target.files)
    }

  return (
    <Container className='flex h-full items-center mt-10 justify-center'>
        <form onSubmit={handleUpload} className='shadow-md dark:shadow-darkShadow'>
      <input className='p-2 bg-lightCard rounded-md mx-2' type='file'  onChange={handleFileSelect}/>
      <button className='bg-buttonLightBg dark:bg-buttonDark text-darkText dark:bg-buttonDarkBg dark:text-lightText  font-bold  p-2 '>Upload</button>
        </form>
    </Container>
    
  )
}

export default React.memo(UploadFileForm)
