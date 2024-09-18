import * as z from "zod";

export const updatePostSchema = z.object({
  postId: z.string().uuid({ message: "O ID do post deve ser um UUID válido." }),
  title: z.string().min(10, {
    message: "O título deve ter pelo menos 10 caracteres.",
  }),
  text: z.string(),
  user: z.object({
    userId: z.string().uuid({ message: "O ID do usuário deve ser um UUID válido." }),
  }),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
