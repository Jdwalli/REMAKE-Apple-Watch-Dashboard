import React, { FunctionComponent, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../common/Button";

interface WrapperProps { onDrop?: (files: File[]) => void }

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 5,
  borderColor: "#111827",
  borderStyle: "dashed",

  color: "#9ca3af",
  outline: "none",
  transition: "border .24s ease-in-out",
  className: "dropzone",
  width: "100%",
  height: "100%",
  justifyContent: "center",
};

const focusedStyle = { borderColor: "#7FD9ED" };
const acceptStyle = { borderColor: "#2bebc8" };
const rejectStyle = { borderColor: "#f24646" };

const FileDropzone: FunctionComponent<WrapperProps> = (props: WrapperProps) => {
  const { getRootProps, getInputProps, open, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: props.onDrop,
    useFsAccessApi: false, // Linux file system issue fix: https://github.com/react-dropzone/react-dropzone/issues/1190
    multiple: false,
    accept: {
      "application/zip": [".zip"],
      "application/x-7z-compressed": [".7z"],
      "application/gzip": [".gz"],
    },
    onError: (e) => console.error(`File Dropzone Error: ${e}`),
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="m-2"> Drag and drop your export here or </p>
        <Button onClick={open} variant={"primary"} text={"Choose File..."} />
      </div>
    </div>
  );
};

export { FileDropzone };
