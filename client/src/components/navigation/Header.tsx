import React, { useState, useEffect, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../common/Button";

const Header: FunctionComponent = () => {
  return (
    <div className="fixed w-screen flex items-center py-4 bg-gray-900 text-sky-300 shadow-lg border-aquamarine-700 ">
        <span className='ml-2 text-2xl'>
            Apple Watch Dashboard 
        </span>
        <div className='ml-auto'>
        <Button variant={"primary"} text={"Upload"}/>
        </div>
    </div>
  );
};

export { Header };
