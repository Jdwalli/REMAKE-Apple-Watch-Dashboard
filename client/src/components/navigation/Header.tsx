import React, { useState, useEffect, FunctionComponent } from "react";
import { Button } from "../common/Button";
import { openModal } from "../../redux/features/uploadModalSlice";
import { useDispatch } from "react-redux";

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();

  const showUploadModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="fixed w-screen flex items-center py-4 bg-gray-900 text-sky-300 shadow-lg border-aquamarine-700 ">
      <span className="ml-2 text-2xl">Apple Watch Dashboard</span>
      <div className="ml-auto">
        <Button variant={"primary"} text={"Upload"} onClick={showUploadModal} />
      </div>
    </div>
  );
};

export { Header };
