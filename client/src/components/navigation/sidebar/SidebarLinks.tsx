import React, { useState, useEffect, FunctionComponent } from "react";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";

const style = {
  title: `mx-4 text-sm`,
  active: `bg-gray-700 rounded-full`,
  link: `flex items-center justify-start my-1 p-3 w-full hover:text-white`,
  close: `lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all`,
  open: `lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto`,
};

const SidebarLinks: FunctionComponent = () => {

    const [currentPath, setCurrentPath] = useState("");

    const path = useLocation();
    useEffect(() => {
      setCurrentPath(path.pathname);
    }, [path.pathname]);


  return (
    <ul className="md:pl-3">
      <li>
        {SidebarData.map((item : any) => {
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
      </li>
    </ul>
  );
}

export { SidebarLinks };
