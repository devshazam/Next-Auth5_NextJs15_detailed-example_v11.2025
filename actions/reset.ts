"use server"

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import prisma from '@/lib/db'
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";


// Получить юзера или создать
export async function reset(prevState: any, formData: FormData) {
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


		const email = formData.get("email") as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { ...apiResult, response: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { ...apiResult, success: "Reset email sent!" };
}