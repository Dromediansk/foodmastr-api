import { Currencies } from "./Currencies";

export enum Records {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export interface Record {
  id: number;
  type: Records;
  user_id: number;
  amount: number;
  currency: Currencies;
  category_id: number;
  account_id: number;
  description: string;
  created: Date;
}
