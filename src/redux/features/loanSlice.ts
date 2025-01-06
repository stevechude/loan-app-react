import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  openDetails: false,
  loanId: "",
};

const loanSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setOpenDetails: (state, action: PayloadAction<boolean>) => {
      state.openDetails = action.payload;
    },
    setLoanId: (state, action: PayloadAction<string>) => {
      state.loanId = action.payload;
    },
  },
});

export const { setOpenDetails, setLoanId } = loanSlice.actions;

export default loanSlice.reducer;
