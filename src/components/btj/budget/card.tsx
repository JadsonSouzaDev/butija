import { X } from "lucide-react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Expense, type Income } from "~/model/budget";

const BudgetItemCard: FC<{ item: Income | Expense }> = ({ item }) => {
  return (
    <Card className="mx-auto min-w-[160px] max-w-[170px] rounded-3xl">
      <div className="-mb-10 flex justify-end p-1">
        <Button variant={"ghost"} size={"icon"}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span>{item.amount.format()}</span>
          <span className="text-muted-foreground">
            no dia {item.expectedDay}
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
};

export default BudgetItemCard;
