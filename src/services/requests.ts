import { LoanHistory, Trx, UserDeets } from "../lib/types";

export const fetchTransactions = async (): Promise<Trx[]> => {
  const response = await fetch("/data/transactions.json");
  const data: Trx[] = await response.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.isArray(data) ? data : []);
    }, 1000);
  });
};

export const fetchLoanHistory = async (): Promise<LoanHistory[]> => {
  const response = await fetch("/data/loan-history.json");
  const data: LoanHistory[] = await response.json();
  return Array.isArray(data) ? data : [];
};

export const fetchUser = async (): Promise<UserDeets> => {
  const response = await fetch("/data/user-details.json");
  const data = await response.json();
  return data ? data : {};
};
