import * as z from "zod"


const emailRegex =
/^(?!\.)(?!.*\.\.)([A-Z0-9_'+-\.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

export const loginSchema = z.object({
    email: z.string().superRefine((data, ctx) => {
        if (!emailRegex.test(data)) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_string,
                message: "Email Inválido!",
                validation: "email",
            });
        }
    }),
    password: z.string().min(9, {
        message: "A senha deve ter pelo menos 9 caracteres.",
    }),
})

export type LoginSchema = z.infer<typeof loginSchema>;
