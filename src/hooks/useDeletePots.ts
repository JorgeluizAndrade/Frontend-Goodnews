import axios from "axios"

export type Delete = {
    id: string
}

export const useDeletePost = () => {
    const deletePost = async ({ id }: Delete) => {
        const token = localStorage.getItem("TOKEN_AUTH");
        if (!token) {
            console.error("Usuário não está autenticado");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:8080/api/posts/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            return response.data;
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    return { deletePost }
}


