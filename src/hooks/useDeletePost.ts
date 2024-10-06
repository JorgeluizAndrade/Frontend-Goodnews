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
                `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${id}`,
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


