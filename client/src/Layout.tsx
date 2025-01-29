import React from "react";
import { Navbar } from "./components/NavbarComponents/Navbar";
import { SettingsModal } from "./components/SettingsComponent/SettingsModal";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="drawer md:drawer-open flex h-screen lg:w-3/4 mx-auto overflow-auto bg-base-200 ">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side h-full z-50">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <Navbar />
      </div>

      <div className="drawer-content  flex-1  ">
        <label htmlFor="drawer-toggle" className="btn btn-sm btn-square btn-primary drawer-button md:hidden m-1 absolute top-20 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </label>
        <div className="flex  bg-base-200   h-full">{children}</div>
      </div>

      <SettingsModal></SettingsModal>
    </div>
  );
};
