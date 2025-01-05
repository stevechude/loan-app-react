import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
  const [openMenu, setOpenmenu] = useState(false);

  return (
    <section
      //   style={{ boxShadow: "0px 0px 4px -2px gray" }}
      className="shadow bg-white h-16 flex items-center"
    >
      <div className="w-full flex items-center justify-between px-2 md:px-4 lg:px-8">
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
              onClick={() => setOpenmenu(true)}
              className="text-[#213f7d]"
            >
              <IoMenuSharp size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
