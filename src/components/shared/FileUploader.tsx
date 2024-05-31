import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: String;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer hidden' />
      {
        fileUrl ?
          <>
            <div className="flex flex-1 justify0center w-full p-5 lg:p-10">
              <img
                src={fileUrl}
                alt="image"
                className='file_uploader-img object-contain'
              />
            </div>
            <p className="file_uploader-label">Click or Drag Photo to Replace</p>
          </>
          :
          <div className='file_uploader-box'>
            <img
              src='/assets/icons/file-upload.svg' alt='upload'
              width={96}
              height={77}
            />
            <h3 className="base-medium text-light-2 mb-2 mt-6">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">
              SVG,PNG,JPG or JPEG
            </p>
              {/* <Button className='shad-button_dark_4'>
                Select from computer
              </Button> */}
          </div>
      }



    </div>
  )
}

export default FileUploader