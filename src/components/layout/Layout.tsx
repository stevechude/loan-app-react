import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import QueryProvider from "../../provider/query-provider";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex flex-col gap-0.5 bg-white overflow-hidden">
        <Header />
        <div className="h-screen flex bg-[#F5F5F5]">
          <SideBar />
          <div className="flex-grow p-2 md:p-4 lg:px-12 lg:py-8 overflow-y-auto">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
