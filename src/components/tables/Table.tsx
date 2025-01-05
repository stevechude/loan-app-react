interface Header {
  key: string;
  label: string;
}

type Props = {
  headers: Header[];
  data: any[];
  click?: boolean;
};

const Table = ({ headers, data, click }: Props) => {
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
                  } ${dt[header.key] === "pending" ? "text-red-500" : ""} ${
                    dt[header.key] === "Done" ? "text-btnBgColor" : ""
                  } ${
                    header.key === "Unique Code"
                      ? "font-semibold text-black"
                      : ""
                  } ${header.key === "desc" ? "truncate" : ""}`}
                >
                  <a
                    href={""}
                    className={`${click ? "cursor-pointer" : "cursor-text"}`}
                  >
                    {header.key === "createdAt"
                      ? dt[header.key].slice(0, 10)
                      : dt[header.key]}
                  </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
