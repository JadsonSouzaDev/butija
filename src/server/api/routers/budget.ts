import { create } from "domain";
import { get } from "http";
import { connect } from "http2";
import { z } from "zod";
import { Budget, Expense, ExpenseSection, Income } from "~/model/budget";
import { BRL } from "~/model/currency";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
  getBudget: protectedProcedure.query(async ({ ctx }) => {
    let budget;
    const existingBudget = await ctx.db.budget.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        expenses: {
          orderBy: {
            name: "asc",
          },
        },
        incomes: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    if (existingBudget) budget = existingBudget;

    if (!existingBudget) {
      const createdBudget = await ctx.db.budget.create({
        data: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          expenses: true,
          incomes: true,
        },
      });
      budget = createdBudget;
    }

    const mappedIncomes = budget?.incomes.map((income) => {
      return {
        ...income,
        amount: new BRL(income.amount),
      } as Income;
    });
    const mappedExpenses = budget?.expenses.map((expense) => {
      return {
        ...expense,
        amount: new BRL(expense.amount),
        section: expense.section as unknown as ExpenseSection,
      } as Expense;
    });
    return {
      ...existingBudget,
      incomes: mappedIncomes,
      expenses: mappedExpenses,
    } as Budget;
  }),

  createItemBudget: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        amount: z.number().min(0.01),
        category: z.string().min(2).max(50),
        expectedDay: z.number().min(1).max(31),
        type: z.enum(["income", "expense"]),
        section: z
          .enum(["FIXED", "VARIABLE", "INVESTIMENT" as const])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const budget = await ctx.db.budget.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!budget) {
        throw new Error("Budget not found");
      }

      if (input.type === "income") {
        return await ctx.db.income.create({
          data: {
            name: input.name,
            amount: input.amount,
            category: input.category,
            expectedDay: input.expectedDay,
            budgetId: budget.id,
          },
        });
      }

      return await ctx.db.expense.create({
        data: {
          name: input.name,
          amount: input.amount,
          category: input.category,
          section: input.section ?? "FIXED",
          expectedDay: input.expectedDay,
          budgetId: budget.id,
        },
      });
    }),

  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
