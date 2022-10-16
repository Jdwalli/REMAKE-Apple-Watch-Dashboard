import React, { FunctionComponent, useState } from "react";
import Dropzone from "./Dropzone";
import  { closeModal } from '../../redux/features/uploadModalSlice'
import { useDispatch } from 'react-redux'

interface Props {
  open: boolean;
}

const ExportUpload: FunctionComponent<Props> = (props: Props) => {
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [filesUploading, setFilesUploading] = useState<boolean>(false);
  const [filesUploaded, setFilesUploaded] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const onFileDrop = (files: File[]) => {
    const newFiles = [...stagedFiles, ...files];
    setStagedFiles(newFiles);
  };

  const dispatch = useDispatch()


  const closeUploadModal = () => {
    console.log("Closing modal")
    dispatch(closeModal())
  }

  return (
    <div>
      {props.open ? (
        <div className="bg-white p-3 rounded-lg">
          <div className='w-100 flex mb-5'> 
            <span> Upload Apple Health Export </span>
            <button className="ml-auto" onClick={closeUploadModal}>X</button>
            <br />
          </div>
          <Dropzone
            stagedFiles={stagedFiles}
            onButtonClick={() => console.log("TODO WRITE UPLOAD FILE CODE")}
            onDrop={onFileDrop}
            buttonDisabled={buttonDisabled}
            dropzoneDisabled={filesUploaded}
          />
        </div>
        
      ) : null}
    </div>
  );
};

export default ExportUpload;
