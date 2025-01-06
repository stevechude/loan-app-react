import { useState } from "react";
import { useForm } from "react-hook-form";

const NewLoan = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (data: any) => {
    setIsLoading(true);
    try {
      const newLoanData = { ...data };
      if (newLoanData) {
        setTimeout(() => {
          console.log("Loan application data: ", newLoanData);
        }, 2000);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        reset();
        alert("Form submitted successfully!");
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
          Apply for a loan
        </h4>
        {/* form */}
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col items-center gap-4 text-sm md:text-base"
        >
          <div className="flex flex-col">
            <label className="text-[#3D414F]">Purpose:</label>
            <input
              type="text"
              {...register("purpose", { required: true })}
              placeholder="purpose"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
            {errors.purpose && (
              <span className="text-red-600 text-xs">
                enter the loan purpose
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-[#3D414F]">Tenure:</label>
            <input
              type="text"
              {...register("tenure", { required: true })}
              placeholder="duration"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
            {errors.tenure && (
              <span className="text-red-600 text-xs">
                enter the loan tenure
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-[#3D414F]">Amount:</label>
            <input
              type="number"
              {...register("amount", { required: true })}
              placeholder="amount"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base spin-button-none"
            />
            {errors.amount && (
              <span className="text-red-600 text-xs">enter the amount</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 text-white bg-[#39cdcc] rounded-2xl py-1.5 px-4 font-semibold w-fit"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewLoan;
