import { type FC } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { type Expense, type Income } from "~/model/budget";
import { BRL } from "~/model/currency";
import BudgetItemTitle from "./title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import BudgetItemCard from "./card";
import BudgetItemForm from "./form";

type BudgetItemProps = {
  title: string;
  percentage?: number;
  items: Income[] | Expense[];
  totalIncome?: number;
  name: "ganho" | "investimento" | "gasto essencial" | "gasto variável";
};

const BudgetItem: FC<BudgetItemProps> = ({
  title,
  percentage,
  items,
  totalIncome = 0,
  name,
}) => {
  const total = new BRL(
    items.reduce((acc, item) => acc + item.amount.value, 0) ?? 0,
  );
  const positioning = ((total.value * 100) / totalIncome).toFixed(2);

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        <BudgetItemTitle
          percentage={percentage}
          positioning={positioning}
          total={total}
          title={title}
        />
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col items-center gap-10">
          {items.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {items.map((item, key) => {
                  return (
                    <CarouselItem
                      key={key}
                      className="flex basis-1/2 items-center justify-center md:basis-1/3 lg:basis-1/5 xl:basis-1/6"
                    >
                      <BudgetItemCard item={item} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <BudgetItemForm name={name} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BudgetItem;
