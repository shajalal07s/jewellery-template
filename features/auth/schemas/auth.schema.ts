import { z } from "zod";

type TranslationFunction = (key: string) => string;

export function loginSchema(t: TranslationFunction) {
  return z.object({
    email: z.string().email(t("email")),
    password: z.string().min(6, t("password")),
  });
}

export function registerSchema(t: TranslationFunction) {
  return z
    .object({
      name: z.string().min(2, t("name")),
      email: z.string().email(t("email")),
      password: z.string().min(6, t("password")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirmPassword"),
      path: ["confirmPassword"],
    });
}

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
