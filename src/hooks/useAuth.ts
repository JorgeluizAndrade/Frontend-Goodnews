import axios, { AxiosError } from "axios";
import React from "react";
import { LoginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const router = useRouter();


    const login = async ({ email, password }: LoginSchema) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });
            setSuccessMessage("Login realizado com sucesso!");
            setErrorMessage(null);

            localStorage.setItem("TOKEN_AUTH", response.data.token);

            const decodedToken: any = jwtDecode(response.data.token);
            const userId = decodedToken.id;

            const role = decodedToken.role;

            localStorage.setItem("USER_ID", userId);

            if (role == "USER") {
                router.push("/");

            } else {
                setTimeout(() => {
                    router.push("/admin/managerPosts");
                }, 3000)
            }



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