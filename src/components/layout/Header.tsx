import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <section
      //   style={{ boxShadow: "0px 0px 4px -2px gray" }}
      className="shadow bg-white h-16 flex items-center"
    >
      <div className="w-full flex items-center justify-between px-2 md:px-4 lg:px-8 relative">
        <div className="flex items-center gap-1">
          <img src={"/image.png"} width={22} height={20} alt="icon" />
          <h1 className="text-[#213f7d] font-semibold text-lg md:text-xl lg:text-2xl">
            LoanTech
          </h1>
        </div>
        {/* desk */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <img src={"/avatar.png"} alt="avatar" width={30} height={20} />
            <p className="text-[#213f7d]">Adedeji</p>
          </div>

          {/* mob */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setOpenMenu(true)}
              className="text-[#213f7d]"
            >
              <IoMenuSharp size={30} />
            </button>
          </div>
        </div>
        {openMenu && (
          <div className="absolute bg-[#0096c4] text-white text-lg flex flex-col gap-2 w-[95%] rounded-lg top-0">
            <FaWindowClose
              onClick={() => setOpenMenu(false)}
              size={30}
              color="#fff"
              className="self-start m-2"
            />

            <div className="flex flex-col gap-6 p-2 pb-10 font-semibold">
              <a
                href={"/"}
                onClick={() => setOpenMenu(false)}
                className="border-b border-white"
              >
                Dashboard
              </a>
              <a
                href={"/loan-mgt"}
                onClick={() => setOpenMenu(false)}
                className="border-b border-white"
              >
                Loan Management
              </a>
              <a
                href={"/transactions"}
                onClick={() => setOpenMenu(false)}
                className="border-b border-white"
              >
                Transactions
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
