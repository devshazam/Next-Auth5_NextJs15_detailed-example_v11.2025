import * as z from "zod";

export const RegisterSchema = z.object({
	// username: z
	// 	.string()
	// 	.min(3, "Имя пользователя должно быть более 3 символов!")
	// 	.max(25, "Имя пользователя должно быть не более 25 символов!")
	// 	.regex(
	// 	/^[a-zA-Z0-9]+$/,
	// 	"Имя может содержать только латинские буквы и цифры!",
	// 	),
	email: z.string().email("Email не правильный!"),
	phone: z.string().min(6, { message: "Телефон должен быть не менее 6 символов" })
		.optional()
		.or(z.literal('')), // Замена на пустую строку
	password: z
		.string()
		.trim()
		.min(6, { message: "Пароль должен быть не менее 6 символов" })
		.max(25, "Пароль не должен быть более 25 символов!"),
		// .refine((value) => /[A-Z]/.test(value), {
		// message: "Пароль должен содержать заглавные буквы",
		// })
		// .refine((value) => /[a-z]/.test(value), {
		// message: "Пароль должен содержать прописные буквы",
		// })
		// .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
		// message: "Пароль должен содержать специальные символы",
		// })
		// .refine((value) => /\d/.test(value), {
			// message: "Пароль должен содержать цифры",
			// }),
	confirm: z.string().trim().min(6, { message: "Пароль должен быть не менее 6 символов" }),
		})
		.refine((data) => {
    if (data.password !== data.confirm) {
      return false;
    }
    return true;
}, {
	message: "Пароли не совпадают!",
	path: ["confirm"]
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
  .string()
  .trim()
  .min(6, { message: "Пароль должен быть не менее 6 символов" })
  .max(25, "Пароль не должен быть более 25 символов!"),
});

export const NewPasswordSchema = z.object({
	password: z
	.string()
	.trim()
	.min(6, { message: "Пароль должен быть не менее 6 символов" })
	.max(25, "Пароль не должен быть более 25 символов!"),
	token: z.string().min(1, {
		message: "Защитный токен отсутствует!",
	   }),
   });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email обязателен!",
  }),
});



