export interface Trx {
  index: number;
  _id: string;
  createdAt: string;
  transactionType: string;
  amount: number;
  status: string;
}

export interface LoanHistory {
  index: number;
  _id: string;
  createdAt: string;
  purpose: string;
  amount: number;
  tenure: string;
  status: string;
}

export interface UserDeets {
  name: string;
  userId: string;
  balance: string;
  bank: string;
}
