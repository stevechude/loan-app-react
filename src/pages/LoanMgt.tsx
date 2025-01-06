import { useQuery } from "@tanstack/react-query";
import { fetchLoanHistory } from "../services/requests";
import Loader from "../components/loader/Loader";
import Table from "../components/tables/Table";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Modal } from "../components/modal/Modal";
import NewLoan from "../components/loan/NewLoan";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setOpenDetails } from "../redux/features/loanSlice";
import SingleLoan from "../components/loan/SingleLoan";

const LoanMgt = () => {
  const { openDetails } = useAppSelector((state) => state.loanSlice);
  const { data: loans = [], isFetching } = useQuery({
    queryKey: ["fetchLoans"],
    queryFn: () => fetchLoanHistory(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  const dispatch = useAppDispatch();

  {
    /* modal states */
  }
  const [openModal, setOpenModal] = useState(false);

  const [itemsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = Array.isArray(loans)
    ? loans.slice(itemOffset, endOffset)
    : [];

  const pageCount = Math.ceil(loans?.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-[#213F7D] text-lg md:text-xl lg:text-2xl">
            Loan Management
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#fbfbfb] border border-[#39cdcc] rounded-md text-[#39cdcc] px-1.5 py-0.5"
            >
              New Loan
            </button>
            <button className="bg-[#fbfbfb] border border-[#e4033b] rounded-md text-[#e4033b] px-1.5 py-0.5">
              Deactivate
            </button>
          </div>
        </div>

        {/* loan table */}
        <div className="flex flex-col gap-6">
          <div className="w-full overflow-x-auto flex flex-col rounded-md shadow bg-white">
            {isFetching ? (
              <Loader />
            ) : loans.length > 0 ? (
              <Table
                headers={[
                  { key: "index", label: "S/N" },
                  { key: "_id", label: "loan Reference" },
                  { key: "purpose", label: "Purpose" },
                  { key: "amount", label: "Amount" },
                  { key: "tenure", label: "Tenure" },
                  { key: "createdAt", label: "Date" },
                  { key: "status", label: "Status" },
                ]}
                click={true}
                data={currentItems}
              />
            ) : (
              <div className="flex items-center justify-center text-xl font-semibold mt-10">
                No data available!
              </div>
            )}
          </div>
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
      {/* new loan form */}
      {openModal && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <NewLoan />
        </Modal>
      )}
      {/* view loan details */}
      {openDetails && (
        <Modal
          show={openDetails}
          onClose={() => dispatch(setOpenDetails(false))}
        >
          <SingleLoan />
        </Modal>
      )}
    </>
  );
};

export default LoanMgt;
