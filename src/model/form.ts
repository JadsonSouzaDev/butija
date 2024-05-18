import { type ZodTypeAny } from "zod";

export type FormField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  schema: ZodTypeAny;
  defaultValue?: string | number | boolean;
};
