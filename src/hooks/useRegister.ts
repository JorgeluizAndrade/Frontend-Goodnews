import axios, { AxiosError } from "axios";
import React from "react";
import { RegisterSchema } from "@/schemas/registerSchema";
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();


    const register = async ({ name, lastname, email, password, role }: RegisterSchema) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                name, lastname, email, password, role
            });
            setSuccessMessage("Registro realizado com sucesso!");
            setErrorMessage(null);

            setTimeout(() => {
                router.push("/admin/login");
            }, 3000)
            setLoading(false);
            return response.data;
        } catch (error) {
            setSuccessMessage(null);
            setLoading(true);

            if (error instanceof AxiosError && error.response?.status === 409) {
                setErrorMessage("Email do usuário já existente. Por favor, tente outro.");
            } else {
                setErrorMessage("Algo deu errado. Tente novamente.");
            }
            console.error("Registration failed:", error);
        }
    };

    return { register, successMessage, errorMessage, loading }
}