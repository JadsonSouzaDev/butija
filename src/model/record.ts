import { type Income, type Expense } from "./budget";
import { type Currency } from "./currency";
import { type Traceable } from "./trace";

export type Record = {
  id: string;
  name: string;
  amount: Currency;
  date: Date;
  budgetItem: Expense | Income;
} & Traceable;
