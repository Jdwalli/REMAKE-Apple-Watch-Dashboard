import React, { useState, useEffect, FunctionComponent } from "react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarLinks } from "./SidebarLinks";
import { useLocation } from "react-router-dom";
import css from './style.module.css'; 


const Sidebar: FunctionComponent = () => {
  const [currentPath, setCurrentPath] = useState("");

  const path = useLocation();
  useEffect(() => {
    setCurrentPath(path.pathname);
  }, [path.pathname]);

  return (
    <div className={`h-screen fixed top-0 left-0 w-20 flex flex-col items-center py-4 gap-y-4 bg-gray-900 shadow-lg border-aquamarine-700 pb-32 lg:pb-12 ${css.scrollbar}`}>
      <SidebarLogo />
      <SidebarLinks />
    </div>
  );
};

export { Sidebar };
