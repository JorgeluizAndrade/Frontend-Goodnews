import * as z from "zod";

const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+-\.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  
export const registerSchema = z.object({
    name: z.string().min(5, {
      message: "O primeiro nome deve ter pelo menos 5 caracteres.",
    }),
    lastname: z.string().min(5, {
      message: "O último nome deve ter pelo menos 5 caracteres.",
    }),
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
    role: z.string().max(5, {
      message: "A role deve ter pelo menos 5 caracteres.",
    }),
  });
  