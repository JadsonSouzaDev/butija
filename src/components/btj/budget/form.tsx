"use client";

import { type FC } from "react";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { type FormField } from "~/model/form";
import { Button } from "~/components/ui/button";
import BTJForm from "~/components/btj/form";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";

type BudgetItemFormProps = {
  name: "ganho" | "investimento" | "gasto essencial" | "gasto variável";
};

type FormValues = {
  name: string;
  amount: number;
  category: string;
  expectedDay: number;
};

const formFieldsExpense: FormField[] = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    placeholder: "Ex: Aluguel",
    schema: z.string().min(2).max(50),
  },
  {
    name: "amount",
    label: "Valor",
    type: "money",
    placeholder: "R$ 900,00",
    schema: z.number().min(0.01),
    defaultValue: 0.01,
  },
  {
    name: "category",
    label: "Categoria",
    type: "text",
    placeholder: "Moradia",
    schema: z.string().min(2).max(50),
  },
  {
    name: "expectedDay",
    label: "Dia esperado",
    type: "number",
    placeholder: "3",
    schema: z.number().min(1).max(31),
    defaultValue: 15,
  },
];

const formFieldsIncome: FormField[] = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    placeholder: "Ex: Pagamento quinzenal",
    schema: z.string().min(2).max(50),
  },
  {
    name: "amount",
    label: "Valor",
    type: "money",
    placeholder: "R$ 1400,00",
    schema: z.number().min(0.01),
    defaultValue: 0.01,
  },
  {
    name: "category",
    label: "Categoria",
    type: "text",
    placeholder: "Salário",
    schema: z.string().min(2).max(50),
  },
  {
    name: "expectedDay",
    label: "Dia esperado",
    type: "number",
    placeholder: "3",
    schema: z.number().min(1).max(31),
    defaultValue: 1,
  },
];

const BudgetItemForm: FC<BudgetItemFormProps> = ({ name }) => {
  const router = useRouter();
  const { toast } = useToast();

  const createItem = api.budget.createItemBudget.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Sucesso",
        description: `${data.name} foi adicionado como um ${name}!`,
      });
      router.refresh();
    },
  });

  const onSubmit = async (values: FormValues) => {
    createItem.mutate({
      ...values,
      section:
        name === "investimento"
          ? "INVESTIMENT"
          : name === "gasto variável"
            ? "VARIABLE"
            : "FIXED",
      type: name === "ganho" ? "income" : "expense",
    });
  };

  return (
    <BTJForm<FormValues>
      title={`Adicionar ${name}`}
      fields={name === "ganho" ? formFieldsIncome : formFieldsExpense}
      onSubmit={onSubmit}
      openButton={
        <Button>
          <div className="flex items-center justify-center gap-1">
            <PlusCircle className="h-5 w-5" />
            <span>adicionar</span>
          </div>
        </Button>
      }
    />
  );
};
export default BudgetItemForm;
