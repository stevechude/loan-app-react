import { setLoanId, setOpenDetails } from "../../redux/features/loanSlice";
import { useAppDispatch } from "../../redux/hooks";

interface Header {
  key: string;
  label: string;
}

type Props = {
  headers: Header[];
  data: any[];
  click?: boolean;
  onView?: () => void;
};

const Table = ({ headers, data, click }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            {headers?.map((header) => (
              <th
                key={header?.key}
                className="text-left text-black px-4 py-2 pb-4 text-sm lg:text-base"
              >
                {header.label}
              </th>
            ))}
            {click && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((dt, idx) => (
            <tr
              key={dt?._id ? dt?._id : idx}
              className={`text-tableTextColor border-t border-b text-xs md:text-sm lg:text-base ${
                click ? "hover:bg-slate-100" : ""
              }`}
            >
              {headers.map((header, i) => (
                <td
                  key={i}
                  className={`text-left px-4 py-3 ${
                    i === headers?.length - 1 && header.key !== "branch"
                      ? "text-green-500"
                      : ""
                  } ${
                    dt[header.key] === "pending" ||
                    dt[header.key] === "inactive"
                      ? "text-red-500"
                      : ""
                  } ${dt[header.key] === "Done" ? "text-btnBgColor" : ""} ${
                    header.key === "Unique Code"
                      ? "font-semibold text-black"
                      : ""
                  } ${header.key === "desc" ? "truncate" : ""}`}
                >
                  <a href={""} className={`${click ? "cursor-text" : ""}`}>
                    {header.key === "createdAt"
                      ? dt[header.key].slice(0, 10)
                      : dt[header.key]}
                  </a>
                </td>
              ))}
              {click && (
                <td>
                  <button
                    onClick={() =>
                      dt.status === "active"
                        ? dispatch(setOpenDetails(true)) &&
                          dispatch(setLoanId(dt._id))
                        : null
                    }
                    className={`rounded-lg px-1.5 py-0.5 text-white ${
                      dt.status === "active"
                        ? "bg-[#39cdcc] cursor-pointer"
                        : "bg-slate-400 cursor-not-allowed"
                    }`}
                  >
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
