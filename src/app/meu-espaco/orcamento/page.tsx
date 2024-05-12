import BudgetItem from "~/app/_components/budget-item";
import BTJPage from "~/components/btj/page";
import { Accordion } from "~/components/ui/accordion";
import { type Expense, type Income } from "~/model/budget";
import { BRL } from "~/model/currency";

export default async function Budget() {
  const incomes: Income[] = [
    {
      id: "1",
      name: "UOL 1/2",
      amount: new BRL(3500),
      category: { id: "1", name: "Salário" },
      expectedDate: new Date(),
    },
    {
      id: "2",
      name: "UOL 2/2",
      amount: new BRL(4000),
      category: { id: "1", name: "Salário" },
      expectedDate: new Date(),
    },
    {
      id: "3",
      name: "Ajuda irmao",
      amount: new BRL(300),
      category: { id: "1", name: "Salário" },
      expectedDate: new Date(),
    },
  ];

  const expenses: Expense[] = [
    {
      id: "1",
      name: "Aluguel",
      amount: new BRL(900),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "1", name: "Essenciais", percentage: 50 },
    },
    {
      id: "2",
      name: "Água",
      amount: new BRL(89.9),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "1", name: "Essenciais", percentage: 50 },
    },
    {
      id: "3",
      name: "Luz",
      amount: new BRL(240),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "1", name: "Essenciais", percentage: 50 },
    },
    {
      id: "4",
      name: "Internet",
      amount: new BRL(80),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "1", name: "Essenciais", percentage: 50 },
    },
    {
      id: "5",
      name: "Lazer",
      amount: new BRL(600),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "2", name: "Variáveis", percentage: 30 },
    },
    {
      id: "6",
      name: "Assinatura Netflix",
      amount: new BRL(45),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "2", name: "Variáveis", percentage: 30 },
    },
    {
      id: "7",
      name: "Cinema",
      amount: new BRL(100),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "2", name: "Variáveis", percentage: 30 },
    },
    {
      id: "8",
      name: "Jantar",
      amount: new BRL(200),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "2", name: "Variáveis", percentage: 30 },
    },
    {
      id: "9",
      name: "CDB",
      amount: new BRL(500),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "3", name: "Investimentos", percentage: 20 },
    },
    {
      id: "10",
      name: "Curso de inglês",
      amount: new BRL(200),
      category: { id: "1", name: "Moradia" },
      expectedDate: new Date(),
      section: { id: "3", name: "Investimentos", percentage: 20 },
    },
  ];
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
            <BudgetItem title="Ganhos" color="blue-400" items={incomes} />
            <BudgetItem
              title="Investimentos"
              percentage={20}
              color="green-400"
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section.name === "Investimentos",
              )}
            />
            <BudgetItem
              title="Gastos essenciais"
              percentage={50}
              color="red-400"
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section.name === "Essenciais",
              )}
            />
            <BudgetItem
              title="Gastos variáveis"
              percentage={30}
              color="yellow-400"
              totalIncome={sumIncomes}
              items={expenses.filter(
                (expense) => expense.section.name === "Variáveis",
              )}
            />
          </Accordion>
        </div>
      </main>
    </BTJPage>
  );
}
