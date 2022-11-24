import React, { useState, useEffect, FunctionComponent } from "react";
import { Button } from "../../common/Button";
import { openModal } from "../../../redux/features/uploadModalSlice";
import { useDispatch } from "react-redux";


const Header: FunctionComponent = () => {
    const dispatch = useDispatch();

    const showUploadModal = () => {
    dispatch(openModal());
    };


  return (
    <header className="h-20 items-center relative z-10 bg-gray-900 text-sky-300 shadow-lg border-aquamarine-700">
      <div className="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="container flex left-0 relative w-3/4">
            <span className="ml-2 text-2xl">Apple Watch Dashboard</span>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
            <Button  className={"block relative"} variant= {"primary"} text={"Upload"} onClick={showUploadModal} />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };

