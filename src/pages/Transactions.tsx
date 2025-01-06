import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import {
  fetchTransactions,
  fetchTransactionsByParams,
} from "../services/requests";
import Loader from "../components/loader/Loader";
import Table from "../components/tables/Table";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Transactions = () => {
  const [trxType, setTrxType] = useState("");
  const { data: transacs = [], isFetching } = useQuery({
    queryKey: ["fetchingTransactions", trxType],
    queryFn: () => fetchTransactionsByParams({ type: trxType }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const [itemsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = Array.isArray(transacs)
    ? transacs.slice(itemOffset, endOffset)
    : [];

  const pageCount = Math.ceil(transacs?.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h1 className="font-medium text-[#213F7D] text-lg md:text-xl lg:text-2xl">
        Transaction History
      </h1>
      {/* table */}
      <div className="flex flex-col gap-6">
        <div className="w-full overflow-x-auto flex flex-col gap-2 rounded-md shadow bg-white">
          <div className="flex items-center gap-3 lg:gap-6 px-2 pt-2 md:px-3 lg:px-4 lg:pt-4">
            <p className="text-[#213F7D]">Filter</p>
            <div className="flex items-center gap-4">
              <select
                name="type"
                id="type"
                onChange={(e) => setTrxType(e.target.value)}
                className="flex items-center gap-2 rounded-lg cursor-pointer text-white bg-[#39cdcc] py-1 px-2 outline-none"
              >
                <option hidden>Type</option>
                <option value="">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          </div>
          {isFetching ? (
            <Loader />
          ) : transacs.length > 0 ? (
            <Table
              headers={[
                { key: "index", label: "S/N" },
                { key: "_id", label: "Transaction Reference" },
                { key: "transactionType", label: "Type" },
                { key: "amount", label: "Amount" },
                { key: "createdAt", label: "Date" },
                { key: "status", label: "Status" },
              ]}
              data={currentItems}
            />
          ) : (
            <div className="flex items-center justify-center text-xl font-semibold mt-10">
              No data available!
            </div>
          )}
        </div>
        {/* pagination */}
        <div className={"pagContainer"}>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaAngleRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<FaAngleLeft />}
            containerClassName={"paginationContainer"}
            activeClassName={"paginationActive"}
            pageClassName={"eachElem"}
            previousLinkClassName={"prevBtnClass"}
            nextLinkClassName={"nexBtnClass"}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
