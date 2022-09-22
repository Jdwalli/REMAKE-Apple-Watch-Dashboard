import React, { FunctionComponent, useState } from 'react'
import Dropzone from './Dropzone';

const ExportUpload: FunctionComponent = () => {
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [filesUploading, setFilesUploading] = useState<boolean>(false);
  const [filesUploaded, setFilesUploaded] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)



  const onFileDrop = (files: File[]) => {
    const newFiles = [...stagedFiles, ...files];
    setStagedFiles(newFiles);
  }



  return (
    <div className='w-96'>
      <Dropzone stagedFiles={stagedFiles} onButtonClick={() => console.log('The button was clicked!')} onDrop={onFileDrop} buttonDisabled={buttonDisabled} dropzoneDisabled={filesUploaded} />
    </div>
  )
}

export default ExportUpload