import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";

type Props = {};

const Login = (props: Props) => {

  const form = useForm();

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">
          Bote seu a Email e Senha para entrar
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <div className="text-center text-sm">
            Não tem uma conta?{" "}
          <Link href="/admin/register" className="underline" prefetch={false}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
