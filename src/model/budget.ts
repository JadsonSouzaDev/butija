import { type Currency } from "./currency";
import { type Traceable } from "./trace";

export type Category = {
  id: string;
  name: string;
};

interface BudgetItem extends Traceable {
  id: string;
  name: string;
  amount: Currency;
  category: Category;
  expectedDate: Date;
}

export type ExpenseSection = {
  id: string;
  name: string;
  percentage: number;
};

export type Expense = {
  section: ExpenseSection;
} & BudgetItem;

export type Income = BudgetItem;

export type Budget = {
  id: string;
  incomes: Income[];
  expenses: Expense[];
};
