import { useQuery } from "@tanstack/react-query";
import Placehold from "../assets/Placehold";
import { FaRegStar, FaStar } from "react-icons/fa";
import { fetchTransactions, fetchUser } from "../services/requests";
import { useMemo } from "react";
import Loader from "../components/loader/Loader";
import Table from "../components/tables/Table";
import { Trx } from "../lib/types";

export default function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ["getTransactions"],
    queryFn: () => fetchTransactions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  console.log("deets==", userDetails);

  const recentTransactions: Trx[] = useMemo(() => {
    return (data || []).slice(0, 8);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      {/* deets */}
      <div
        style={{ boxShadow: "0px 0px 4px -2px gray" }}
        className="rounded-lg h-56 w-full bg-white flex items-center"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-wrap gap-2.5 lg:flex-nowrap justify-between px-2 md:px-5 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="rounded-full border p-3 md:p-4 lg:p-6 bg-[#213F7D] bg-opacity-15">
                <Placehold />
              </div>
              <div className="flex flex-col gap-2 text-[#213F7D]">
                <p className="text-lg md:text-xl lg:text-2xl">
                  {userDetails?.name}
                </p>
                <p className="text-xs lg:text-sm">{userDetails?.userId}</p>
              </div>
            </div>

            {/* stars */}
            <div className="flex items-center gap-3 border-s border-e px-4">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[#213F7D] text-lg md:text-xl lg:text-2xl">
                  User’s Tier
                </p>
                <span className="flex items-center gap-2">
                  <FaStar color="#E9B200" />
                  <FaRegStar color="#E9B200" />
                  <FaRegStar color="#E9B200" />
                </span>
              </div>
            </div>

            {/* amt */}
            <div className="flex items-center text-[#213F7D]">
              <div className="flex flex-col gap-2 lg:gap-3">
                <p className="text-lg md:text-xl lg:text-2xl">
                  {userDetails?.balance}
                </p>
                <p className="text-xs lg:text-sm">{userDetails?.bank}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* table of recent trx */}
      <p className="font-medium text-[#213F7D] text-lg md:text-xl lg:text-2xl">
        Recent Transactions
      </p>
      <div className="w-full overflow-x-auto flex flex-col rounded-lg shadow bg-white">
        {isFetching ? (
          <Loader />
        ) : recentTransactions.length > 0 ? (
          <Table
            headers={[
              { key: "index", label: "S/N" },
              { key: "_id", label: "Transaction Reference" },
              { key: "transactionType", label: "Type" },
              { key: "amount", label: "Amount" },
              { key: "createdAt", label: "Date" },
              { key: "status", label: "Status" },
            ]}
            data={recentTransactions}
          />
        ) : (
          <div className="flex items-center justify-center text-xl font-semibold mt-10">
            No data available!
          </div>
        )}
      </div>
    </div>
  );
}
