import { type FC } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Income, type Expense } from "~/model/budget";
import { X, PlusCircle } from "lucide-react";
import { BRL } from "~/model/currency";

const BudgetItem: FC<{
  title: string;
  percentage?: number;
  color: string;
  items: Income[] | Expense[];
  totalIncome?: number;
}> = ({ title, percentage, items, totalIncome = 0 }) => {
  const total = new BRL(
    items.reduce((acc, item) => acc + item.amount.value, 0) ?? 0,
  );

  const positioning = ((total.value * 100) / totalIncome).toFixed(2);
  console.log(positioning);

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between text-base">
          <div className="flex items-center space-x-2">
            {percentage && (
              <div className="flex items-center space-x-2">
                <span
                  className={
                    +positioning > percentage
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {positioning.replace(".", ",")}%
                </span>
                <span className="text-muted-foreground text-sm">de</span>
                <span className=" text-yellow-500">{percentage}%</span>
                <span className="text-muted-foreground hidden text-sm md:block">
                  em
                </span>
              </div>
            )}

            <span>{title}</span>
          </div>

          <span className="text-muted-foreground">{total.format()} </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex items-end gap-2">
          <Button className="mb-3 w-[150px]">
            <div className="flex items-center justify-center gap-1">
              <PlusCircle className="h-5 w-5" />
              adicionar
            </div>
          </Button>
          {items.map((item, key) => {
            return (
              <Card
                key={key}
                className="w-auto min-w-[160px] max-w-[170px] rounded-3xl"
              >
                <div className="-mb-10 flex justify-end p-1">
                  <Button variant={"ghost"} size={"icon"}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <span>{item.amount.format()}</span>
                    <span className="text-muted-foreground">
                      no dia{" "}
                      {item.expectedDate.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="px-2 pb-3">
                  <Button variant="secondary" className="w-full">
                    editar
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BudgetItem;
