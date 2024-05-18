"use client";

import { type ReactNode, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMediaQuery } from "~/hooks/useMediaQuery";
import { type FormField } from "~/model/form";
import { Input } from "~/components/ui/input";
import MoneyInput from "~/components/ui/money-input";

type BTJFormProps<Type> = {
  title: string;
  description?: string;
  openButton: ReactNode;
  fields: FormField[];
  onSubmit: (data: Type) => void;
};

function BTJForm<Type>({
  fields,
  openButton,
  title,
  description,
  onSubmit: onSubmitExternal,
}: BTJFormProps<Type>) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSubmit = (data: Type) => {
    onSubmitExternal(data);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{openButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <BTJRenderForm<Type> fields={fields} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{openButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4">
          <BTJRenderForm<Type> fields={fields} onSubmit={onSubmit} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BTJRenderForm<Type>({
  fields,
  onSubmit,
}: {
  fields: FormField[];
  onSubmit: (data: Type) => void;
}) {
  const formSchema = z.object(
    fields.reduce(
      (acc, field) => {
        acc[field.name] = field.schema;
        return acc;
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce(
      (acc, field) => {
        acc[field.name] = (field.defaultValue as string) ?? "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data as Type))}
        className="mt-6 grid items-start gap-4"
      >
        {fields.map((formField) => {
          if (formField.type === "money") {
            return (
              <MoneyInput
                key={formField.name}
                form={form}
                label={formField.label}
                name={formField.name}
                placeholder={formField.placeholder}
              />
            );
          }

          return (
            <FormFieldComponent
              key={formField.name}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formField.placeholder}
                      {...field}
                      onChange={(e) => {
                        e.preventDefault();
                        if (formField.type === "number") {
                          field.onChange(parseFloat(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button className="mt-6" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}

export default BTJForm;
