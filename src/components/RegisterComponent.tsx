"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+-\.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

const registerSchema = z.object({
  name: z.string().min(5, {
    message: "O primeiro nome deve ter pelo menos 5 caracteres.",
  }),
  lastname: z.string().min(5, {
    message: "O último nome deve ter pelo menos 5 caracteres.",
  }),
  email: z.string().superRefine((data, ctx) => {
    if (!emailRegex.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        message: "Email Inválido!",
        validation: "email",
      });
    }
  }),
  password: z.string().min(9, {
    message: "A senha deve ter pelo menos 9 caracteres.",
  }),
  role: z.string().max(5, {
    message: "A role deve ter pelo menos 5 caracteres.",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterComponent = () => {
  const { toast } = useToast()

  const dataUserCreation = Date().toLocaleUpperCase();

  const [loading, setLoading] = React.useState(true);

  const fetchData = async ({
    name,
    lastname,
    email,
    password,
    role,
  }: RegisterFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { name, lastname, email, password, role }
      );
      toast({
        title: "Registration successful",
        description: dataUserCreation,
      })

      console.log("Registration successful:", response.data);
      setLoading(true);
      return response.data;
    } catch (error) {
      setLoading(true);
      toast({
        title: "Something went wrong",
        description: "Não foi possível completar o registro. Tente novamente.",
      })
      console.error("Registration failed:", error);
    }
  };

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    fetchData(data);
    setLoading(false)
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Registrar-se</h1>
        <p className="text-muted-foreground">
          Digite suas informações para registro.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Lee" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="last-name">Último Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="last-name"
                        placeholder="Robinson"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <Input id="role" disabled type="role" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading === true ? (
              <Button type="submit" className="w-full">
                Registrar-se
              </Button>
            ) : (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Criando conta
              </Button>
            )}
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/admin/login" className="underline" prefetch={false}>
                Entrar
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterComponent;
