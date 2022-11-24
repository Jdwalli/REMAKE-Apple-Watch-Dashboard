import { FaFire } from "react-icons/fa";
import React, { FunctionComponent } from "react";

const SidebarLogo: FunctionComponent = () => {
  return (
    <div className="text-red-600 text-4xl flex items-center justify-center mb-3 pb-3 pt-2 sticky top-0 z-10">
      <FaFire />
    </div>
  );
};

export { SidebarLogo };
