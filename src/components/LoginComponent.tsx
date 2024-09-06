import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { LoginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/hooks/useAuth";

type Props = {};

const Login = (props: Props) => {
  const { login, successMessage, errorMessage } = useAuth();

  const form = useForm<LoginSchema>();
  
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    login(data);
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Bem-vindo(a)</h1>
        <p className="text-muted-foreground">
          Insira seu email e senha para entrar
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                  <FormLabel  htmlFor="password">Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
