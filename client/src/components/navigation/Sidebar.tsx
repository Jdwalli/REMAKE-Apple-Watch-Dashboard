import React, { useState, useEffect, FunctionComponent } from "react";
import { SidebarData } from "../../helpers/SidebarData";
import { Link, useLocation } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";

const Sidebar: FunctionComponent = () => {
  const [currentPath, setCurrentPath] = useState("");

  const path = useLocation();
  useEffect(() => {
    setCurrentPath(path.pathname);
  }, [path.pathname]);

  return (
    <div className="fixed top-0 mt-16 left-0 w-20 flex flex-col items-center py-4 gap-y-4 bg-gray-900 shadow-lg h-screen border-aquamarine-700 ">
      {SidebarData.map((item) => {
        return (
          <Link to={item.link}>
            <div
              className={
                currentPath === item.link
                  ? "sidebar-icon group text-white rounded-xl"
                  : "sidebar-icon group"
              }
              key={item.title}
            >
              {item.icon}
              <span className="sidebar-tooltip group-hover:scale-100">
                {item.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { Sidebar };
