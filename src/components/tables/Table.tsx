import { Link } from "react-router-dom";
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

  function formatAmount(amount: number) {
    // const numericAmount =
    const amountString =
      typeof amount === "string" ? amount : amount?.toString();

    // Remove commas from the amount
    const numericAmount = parseFloat(amountString?.replace(/,/g, ""));

    return Number(numericAmount).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }); // Format the number with commas
  }

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
              className={`text-[#4f4f4f] border-t border-b text-xs md:text-sm lg:text-base ${
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
                  {header.key === "amount" ? "₦" : ""}
                  <Link to={""} className={`${click ? "cursor-text" : ""}`}>
                    {header.key === "createdAt"
                      ? dt[header.key].slice(0, 10)
                      : dt[header.key] && header.key === "amount"
                      ? formatAmount(dt[header.key])
                      : dt[header.key]}
                  </Link>
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
