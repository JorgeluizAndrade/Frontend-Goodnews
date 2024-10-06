import { PostSchema } from "@/schemas/postSchema"
import axios, { AxiosError } from "axios";
import React from "react";


export const useCreatePost = () => {
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const createPost = async ({ title, text, user: {
        id
    } }: PostSchema) => {
        const token = localStorage.getItem("TOKEN_AUTH")
        console.log(token)
        if (!token) {
            console.error("Usuário não está autenticado");
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts`,
                {
                    title,
                    text,
                    user: { id }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });



            setSuccessMessage("Post Criado com sucesso!");
            setErrorMessage(null);

            return response.data;
        } catch (error) {
            setSuccessMessage(null);
            setErrorMessage("Algo deu errado. Tente novamente.");
            console.error("Registration failed:", error);
        }
    }


    return { createPost, errorMessage, successMessage }
}


