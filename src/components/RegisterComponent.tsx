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
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { RegisterSchema, registerSchema } from "@/schemas/registerSchema";
import { useRegister } from "@/hooks/useRegister"

const RegisterComponent = () => {
  const { register, successMessage, errorMessage, loading } = useRegister();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    register(data)
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Registrar-se</h1>
        <p className="text-muted-foreground">
          Digite suas informações para registro.
        </p>
      </div>

      {successMessage && (
        <div className="text-green-600 font-semibold text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 font-semibold text-center">
          {errorMessage}
        </div>
      )}

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
