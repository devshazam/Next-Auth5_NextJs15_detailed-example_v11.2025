import NextAuth from "next-auth"
import  { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: { // переписывает дефолтные адреса, НО дефолтные формы не используются
    	signIn: "/auth/login", // кастомизировать
		// default: /api/auth/signin
	error: '/auth/error', // Error code passed in query string as ?error=
		// default: /api/auth/error
		// signOut default: /auth/signout TODO можно сделать кастомизацию
	},
  events: {
	// событие после связывания аккаунта соцсети и юзера 
	async linkAccount({ user }) {
		// т.к. верефикация почты не требуется закрываем ее
		await prisma.user.update({
		where: { id: user.id },
		data: { emailVerified: new Date() }
		})
	}
  },
  	callbacks: {
		async signIn({ user, account }) {
			// 1. При использовании провайдеров социальных сетей не проходить email verification
			if (account?.provider !== "credentials") return true;

			// 2. 
			const existingUser = await getUserById(user.id);

			// 3. если пользователь не прошел email verification - отклонить
			if (!existingUser?.emailVerified) return false;

			return true;
		},
	// формирование token-a при авторизации: добавление требуемых полей (role? )
		async jwt({ token }) { // возвращает токен
			if (!token.sub) return token;
		
			const existingUser = await getUserById(token.sub);
		
			if (!existingUser) return token;
		
			const existingAccount = await getAccountByUserId(
			existingUser.id
			);
		
			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		},
	// Создание клиентской сессии 
		async session({ token, session }) {
			console.log(3, token, session);
				if (token.sub && session.user) {
				session.user.id = token.sub;
				}

				if (token.role && session.user) {
				session.user.role = token.role as UserRole;
				}

				if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
				session.user.isOAuth = token.isOAuth as boolean;
				}

				return session;
		},

  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

/**
 * 1. signIn callback:

This is triggered when a user successfully signs in through any provider (e.g., Google, GitHub).
It receives information about the user, account, profile, email, and credentials used for login.
What you can do here: You can perform additional checks or validations on the user before allowing them access. Here, it simply returns true to proceed.


2. redirect callback:

This determines where the user is redirected after a successful login or sign-up.
It receives the url that NextAuth would normally redirect to and the baseUrl of your application.
What you can do here: You can modify the redirect URL based on certain conditions. Here, it returns the baseUrl to redirect to the homepage.


3. session callback:

This happens after a successful login or sign-up and before rendering the user's session.
It receives the existing session object (if any), user information, and the JSON Web Token (JWT).
What you can do here: You can add extra data to the session object that will be available throughout the user's session, like access levels or specific permissions. Here, it returns the session without modification.


4. jwt callback:

This gets called before a JWT is returned to the client after login or sign-up.
It receives the existing JWT token, user information, account details, profile data, and a flag indicating if it's a new user.
What you can do here: You can add custom information to the JWT token that will be sent to the client and accessible on the frontend. Here, it returns the token without modification.
 * 
 */

