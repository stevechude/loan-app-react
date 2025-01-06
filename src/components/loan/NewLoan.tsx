const NewLoan = () => {
  return (
    <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
          Apply for a loan
        </h4>
        {/* form */}
        <form className="flex flex-col items-center gap-4 text-sm md:text-base">
          <div className="flex flex-col">
            <label className="text-[#3D414F]">Purpose:</label>
            <input
              type="text"
              placeholder="purpose"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#3D414F]">Tenure:</label>
            <input
              type="text"
              placeholder="duration"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#3D414F]">Amount:</label>
            <input
              type="number"
              placeholder="amount"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base spin-button-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 text-white bg-[#39cdcc] rounded-2xl py-1.5 px-4 font-semibold w-fit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewLoan;
