import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";


export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
  	const token = uuidv4();
	// генерируем токен со сроком на 1 час
  	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const verficationToken = await prisma.verificationToken.upsert({
		where: { identifier: email },
		update: {
			token,
			expires,
		},
		create: {
			identifier: email,
			token,
			expires,
		},
	})
//   const existingToken = await getVerificationTokenByEmail(email);

//   if (existingToken) {
//     await prisma.verificationToken.delete({
//       where: {
//         id: existingToken.id,
//       },
//     });
//   }

//   const verficationToken = await prisma.verificationToken.create({
//     data: {
//       email,
//       token,
//       expires,
//     }
//   });

  return verficationToken;
};
