import axios, { AxiosError } from "axios";
import React from "react";
import { LoginSchema } from "@/schemas/loginSchema";

export const useAuth = () => {
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const login = async ({ email, password }: LoginSchema) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });
            setSuccessMessage("Login realizado com sucesso!");
            setErrorMessage(null);

            // Armazenar o token no localStorage ou sessionStorage
            localStorage.setItem("token", response.data.token);

            return response.data;
        } catch (error) {
            setSuccessMessage(null);
            if (error instanceof AxiosError && error.response?.status === 500) {
                setErrorMessage("Email ou senha incorretos, ou o email não está cadastrado.");
            } else {
                setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
            }
            console.log(error);
        }
    };

    return { login, successMessage, errorMessage }
}