import { type FC } from "react";
import { type Currency } from "~/model/currency";

type BudgetItemTitleProps = {
  percentage?: number;
  positioning: string;
  title: string;
  total: Currency;
};

const BudgetItemTitle: FC<BudgetItemTitleProps> = ({
  percentage,
  positioning,
  title,
  total,
}) => {
  return (
    <div className="flex w-full items-center justify-between text-base">
      <div className="flex items-center space-x-2">
        {percentage && (
          <div className="flex items-center space-x-2">
            <span
              className={
                title === "Investimentos"
                  ? percentage > +positioning
                    ? "text-red-500"
                    : "text-green-500"
                  : +positioning > percentage
                    ? "text-red-500"
                    : "text-green-500"
              }
            >
              {+positioning ? `${positioning.replace(".", ",")}%` : "0%"}
            </span>
            <span className="text-sm text-muted-foreground">de</span>
            <span className=" text-yellow-500">{percentage}%</span>
            <span className="hidden text-sm text-muted-foreground md:block">
              em
            </span>
          </div>
        )}

        <span>{title}</span>
      </div>

      <span className="text-muted-foreground">{total.format()} </span>
    </div>
  );
};

export default BudgetItemTitle;
