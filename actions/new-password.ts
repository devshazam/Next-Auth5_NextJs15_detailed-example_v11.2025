"use server"
import bcrypt from "bcryptjs";
;

import prisma from '@/lib/db'
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";


// Получить юзера или создать
export async function newPassword(prevState: any, formData: FormData) {
	console.log(123, prevState, formData)
	const apiResult =  { success: "", response: "", errors: { token: "", password: ""} };


	// try{
		// Валидация ZOD
		const contactFormData = Object.fromEntries(formData);
		
		const validatedContactFormData = NewPasswordSchema.safeParse(contactFormData);

		if (!validatedContactFormData.success) {
			const formFieldErrors =
				validatedContactFormData.error.flatten().fieldErrors;
			return {...apiResult, errors: formFieldErrors};
		}


		const password = formData.get("password") as string;
		const token = formData.get("token") as string;

//   if (!token) {
//     return { error: "Missing token!" };
//   }

//   const validatedFields = NewPasswordSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { ...apiResult, response: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { ...apiResult, response: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { ...apiResult, response: "Email does not exist!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id }
  });

  return { ...apiResult, success: "Password updated!" };
};
