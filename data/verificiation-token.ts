import prisma from "@/lib/db";

export const getVerificationTokenByToken = async (
  token: string
) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    return verificationToken;
  } catch {
    return null;
  }
}

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { identifier: email }
    });

    return verificationToken;
  } catch {
    return null;
  }
}