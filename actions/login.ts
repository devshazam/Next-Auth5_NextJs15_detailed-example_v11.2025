"use server"

import bcrypt from "bcryptjs";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import prisma from '@/lib/db'
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";


// Получить юзера или создать
export async function login(prevState: any, formData: FormData) {
	console.log(123, prevState, formData)
	const apiResult =  { success: "", response: "", errors: { email: "", password: ""} };


	// try{
		// Валидация ZOD
		const contactFormData = Object.fromEntries(formData);
		
		const validatedContactFormData = LoginSchema.safeParse(contactFormData);

		if (!validatedContactFormData.success) {
			const formFieldErrors =
				validatedContactFormData.error.flatten().fieldErrors;
			return {...apiResult, errors: formFieldErrors};
		}

		// Получение API keys
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const callbackUrl = formData.get("callbackUrl") as string;
		// Проверка email на существование
		
		// return { ...apiResult, success: "Confirmation email sent!" }; 
  
		const existingUser = await getUserByEmail(email);

		if (!existingUser || !existingUser.email || !existingUser.password) {
		  return { ...apiResult, response: "Такой пользователь не существует!" }
		}
	   
		if (!existingUser.emailVerified) {
		  const verificationToken = await generateVerificationToken(
		    existingUser.email,
		  );
	   
		  await sendVerificationEmail(
		    verificationToken.identifier,
		    verificationToken.token,
		  );
	   
		  return {...apiResult,  response: "Вы не верифицировали Email. Мы отправили повторное письмо!" };
		}
	   
	   
	   
		try {
		  await signIn("credentials", {
		    email,
		    password,
			// куда перейти после успешной аутентификации     
		    redirectTo: callbackUrl,
		  })
		} catch (error) {
		  if (error instanceof AuthError) {
		    switch (error.type) {
			 case "CredentialsSignin":
				return {...apiResult, response: "Не правильные пароль!" }
			 default:
			   return {...apiResult,  response: "Не предвиденная ошибка, обратитесь к администратору!" }
		    }
		  }
	   
		  throw error;
		}
};