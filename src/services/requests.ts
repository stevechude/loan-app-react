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

export const fetchTransactionsByParams = async (params: {
  type?: string;
  amount?: number;
}): Promise<Trx[]> => {
  const response = await fetch("/data/transactions.json");
  const data: Trx[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid data format");
  }

  // Filter data based on params
  return data.filter((transaction) => {
    const matchesType = params.type
      ? transaction.transactionType === params.type
      : true;
    const matchesAmount = params.amount
      ? transaction.amount === params.amount
      : true;
    return matchesType && matchesAmount;
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

export const fetchLoanById = async (
  id: string
): Promise<LoanHistory | null> => {
  const response = await fetch("/data/loan-history.json");
  const data: LoanHistory[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid data format");
  }

  const loan = data.find((loan) => loan._id === id);
  return loan || null;
};
