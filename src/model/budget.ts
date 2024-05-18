import { type Currency } from "./currency";
import { type Traceable } from "./trace";

interface BudgetItem extends Traceable {
  id: string;
  name: string;
  amount: Currency;
  category: string;
  expectedDay: number;
}

export enum ExpenseSection {
  INVESTIMENT = "INVESTIMENT",
  FIXED = "FIXED",
  VARIABLE = "VARIABLE",
}

export type Expense = {
  section: ExpenseSection;
} & BudgetItem;

export type Income = BudgetItem;

export type Budget = {
  id: string;
  incomes: Income[];
  expenses: Expense[];
};
