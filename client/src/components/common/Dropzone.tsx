import React, { FunctionComponent, ReactElement } from 'react'
import { FileDropzone } from '../wrappers/DropzoneWrapper';
import { Button } from './Button';

interface DropzoneProps {
    dropzoneDisabled: boolean;
    stagedFiles: File[];
    buttonDisabled?: boolean;
    onButtonClick?: () => void;
    onDrop?: (files: File[]) => void;
    createCustomFileList?: (files: File[]) => ReactElement | null;
}

const Dropzone: FunctionComponent<DropzoneProps> = (props:DropzoneProps) => {
    const stagedFileList = (files: File[]) => {
        if (files.length !== 0) {
            return (
                <ul>
                    {files.map((file: File) => {
                        return (
                            <div key={file.lastModified}>
                                {file.name}
                            </div>
                        )
                    })}
                </ul>
            );
        } else {
            return null;
        }
    }
    
  return (
    <div>
        { props.dropzoneDisabled ? (
        <></>
        ) : ( 
        <FileDropzone 
            onDrop={(files: File[]) => 
                props.onDrop !== undefined ? props.onDrop(files) : null
            } 
        />
        )}

        { props.createCustomFileList === undefined 
        ? stagedFileList(props.stagedFiles)
        : props.createCustomFileList(props.stagedFiles)}
        <div className='flex justify-center items-center px-4 py-3'>
            <Button disabled={ props.buttonDisabled === undefined ? false: props.buttonDisabled}
                onClick={() => props.onButtonClick !== undefined ? props.onButtonClick() : null}
                variant={!props.buttonDisabled ? 'primary' : 'disabled'}
                text={'Upload File...'}
            />
        </div>
    </div>
  )
}

export default Dropzone