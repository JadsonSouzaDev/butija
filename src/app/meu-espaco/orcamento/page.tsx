import BudgetItem from "~/components/btj/budget";
import BTJPage from "~/components/btj/page";
import { Accordion } from "~/components/ui/accordion";
import { ExpenseSection } from "~/model/budget";
import { BRL } from "~/model/currency";
import { api } from "~/trpc/server";

export default async function Budget() {
  const { expenses, incomes } = await api.budget.getBudget();
  console.log("expenses", expenses);

  const sumIncomes = incomes.reduce(
    (acc, income) => acc + income.amount.value,
    0,
  );
  const sumExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount.value,
    0,
  );

  const health = sumIncomes - sumExpenses;

  return (
    <BTJPage>
      <main className="flex flex-col items-center justify-center">
        <div className="gap- container flex flex-col items-center justify-center gap-2 p-4">
          <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-[2rem]">
            Seu <span className="text-yellow-500">Orçamento</span>
          </h1>
          <h2
            className={`text-center text-xl font-extrabold ${health < 0 ? "text-red-500" : "text-green-500"}`}
          >
            <span>{health >= 0 ? "+" : ""}</span>
            {new BRL(health).format()}
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-screen-lg pt-6"
          >
            <BudgetItem title="Ganhos" items={incomes} name="ganho" />
            <BudgetItem
              title="Investimentos"
              name="investimento"
              percentage={20}
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section === ExpenseSection.INVESTIMENT,
              )}
            />
            <BudgetItem
              title="Gastos essenciais"
              name="gasto essencial"
              percentage={50}
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section === ExpenseSection.FIXED,
              )}
            />
            <BudgetItem
              title="Gastos variáveis"
              name="gasto variável"
              percentage={30}
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section === ExpenseSection.VARIABLE,
              )}
            />
          </Accordion>
        </div>
      </main>
    </BTJPage>
  );
}
