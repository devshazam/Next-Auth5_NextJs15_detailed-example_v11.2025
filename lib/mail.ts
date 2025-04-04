import { Resend } from "resend";
// todo TODO 

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
//   await resend.emails.send({
//     from: "mail@kopi34.ru",
//     to: email,
//     subject: "2FA Code",
//     html: `<p>Your 2FA code: ${token}</p>`,
//   });
// };

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "no-reply@kopi34.ru",
    to: email,
    subject: "Сброс пароля на kop34.ru",
    html: `<p>Кликните <a href="${resetLink}">сюда</a> для перехода на страницу сброса пароля.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "no-reply@kopi34.ru",
    to: email,
    subject: "Верификация почты на kopi34.ru",
    html: `<p>Кликните <a href="${confirmLink}">сюда</a> для перехода на страницу верификации.</p>`,
  });
};
