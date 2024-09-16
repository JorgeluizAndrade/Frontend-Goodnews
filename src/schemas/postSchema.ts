import * as z from "zod";

export const postSchema = z.object({
    id:z.string().optional(),
    title: z.string().min(10, {
        message: "O título deve ter pelo menos 10 caracteres.",
    }),
    text: z.string(),
    user: z.object({
        id: z.string().uuid({ message: "O ID do usuário deve ser um UUID válido." }),
    }),
});

export type PostSchema = z.infer<typeof postSchema>