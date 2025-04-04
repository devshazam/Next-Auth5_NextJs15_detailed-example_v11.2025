"use server"

import bcrypt from "bcryptjs";

import prisma from '@/lib/db'
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

// Получить юзера или создать
export async function register(prevState: any, formData: FormData) {
console.log(formData)
	const apiResult =  { success: "", response: "", errors: { email: "", phone: "", password: "", confirm: ""} };


	try{
		// Валидация ZOD
		const contactFormData = Object.fromEntries(formData);
		
		const validatedContactFormData = RegisterSchema.safeParse(contactFormData);

		if (!validatedContactFormData.success) {
			const formFieldErrors =
				validatedContactFormData.error.flatten().fieldErrors;
			return {...apiResult, errors: formFieldErrors};
		}

		// Получение API keys
		const email = formData.get("email") as string;
		const phone = formData.get("phone") as string;
		const password = formData.get("password") as string;

		// Проверка email на существование
		const existingUser = await getUserByEmail(email);
	   
		if (existingUser) {
			return {...apiResult, response: "Пользователь с таким Email уже существует!"};;
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		// Создание юзера
		await prisma.user.create({
			data: {
				phone,
				email,
				password: hashedPassword,
			},
		});

		const verificationToken = await generateVerificationToken(email);
		await sendVerificationEmail(
			verificationToken.identifier, // it's email
			verificationToken.token,
		);

		return { ...apiResult, success: "Confirmation email sent!" };

	} catch (error) {
		console.log(error);
	}
}
