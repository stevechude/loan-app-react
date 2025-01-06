import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../redux/hooks";
import { fetchLoanById } from "../../services/requests";
import Loader from "../loader/Loader";

const SingleLoan = () => {
  const { loanId } = useAppSelector((state) => state.loanSlice);
  const { data: loan, isFetching } = useQuery({
    queryKey: ["fetchSingleLoan"],
    queryFn: () => fetchLoanById(loanId),
  });

  return (
    <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[#213F7D] text-xl lg:text-2xl font-semibold">
          Loan Detail
        </h4>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4 text-sm lg:text-base">
            <div className="flex items-center justify-between">
              <p className="text-[#213F7D]">Purpose:</p>
              <span>{loan?.purpose}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#213F7D]">Tenure:</p>
              <span>{loan?.tenure}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#213F7D]">Amount:</p>
              <span>{loan?.amount}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[#213F7D]">Loan Id:</p>
              <span className="truncate">{loan?._id}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#213F7D]">Date applied:</p>
              <span>{loan?.createdAt?.slice(0, 10)}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#213F7D]">Loan Status:</p>
              <span className="bg-[#f2fcf5] rounded-2xl py-1 px-2.5 border border-[#39CD62] text-[#39CD62]">
                {loan?.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleLoan;
