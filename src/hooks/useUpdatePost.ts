import axios from "axios";
import React from "react";
import { PostSchema } from "@/schemas/postSchema";

export const useUpdatePost = () => {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const updatePost = async ({ id, title, text }: PostSchema) => {
    const token = localStorage.getItem("TOKEN_AUTH");
    const userId = localStorage.getItem("USER_ID");

    if (!token) {
      console.error("Usuário não está autenticado");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${id}/${userId}`,
        {
          title,
          text,
          user: { id: userId },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Post atualizado com sucesso!");
      setErrorMessage(null);

      return response.data;
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Algo deu errado. Tente novamente.");
      console.error("Update failed:", error);
    }
  };

  return { updatePost, errorMessage, successMessage };
};
