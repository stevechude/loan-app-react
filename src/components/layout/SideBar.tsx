import { useLocation } from "react-router-dom";
import { linksMenu } from "../../lib/links";
import DashIcon from "../../assets/DashIcon";

const SideBar = () => {
  const location = useLocation();
  return (
    <div
      //   style={{ boxShadow: "0px 0px 4px -2px gray" }}
      className="hidden lg:flex flex-col max-w-[220px] w-full h-screen bg-white shadow text-black"
    >
      <div className="flex flex-col gap-4">
        <div className={`${location.pathname === "/" ? "links" : ""}`}>
          <a
            href={`/`}
            className="flex items-center gap-2 text-sm lg:text-base py-2 px-6"
          >
            {<DashIcon />}
            <p className="text-[#545f7d]">Dashboard</p>
          </a>
        </div>
        {linksMenu?.map((link) => (
          <div
            key={link.id}
            className={`${
              location.pathname.includes(link.path) ? "links" : ""
            }`}
          >
            <a
              href={`/${link.path}`}
              className="flex items-center gap-2 text-sm lg:text-base py-2 px-6"
            >
              {<link.icon />}
              <p className="text-[#545f7d]">{link.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
