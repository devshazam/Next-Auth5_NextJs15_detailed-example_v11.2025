"use server";

import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

type ResultT = { status: "success" | "error" | "warning", message: string };


export const newVerification = async (token: string): Promise<ResultT> => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {  status: 'error', message: "Токен не существует!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {  status: 'error', message: "Истек срок токена!" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);

  if (!existingUser) {
    return {  status: 'error', message: "Email не существует!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.identifier,
    }
  });

  await prisma.verificationToken.delete({
    where: { identifier: existingToken.identifier },
  });

  return { status: 'success', message: "Email верифицирован!" };
};
