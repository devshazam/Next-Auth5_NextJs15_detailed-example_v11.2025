// import { auth } from "@/auth"
 
// export default auth((req) => {
//   // req.auth - это статус авторизованности
//   //
// 	// Если я зарегистрирован я не могу перейти на страницу входа
// 	if (req.auth && req.nextUrl.pathname === "/auth/login") {
// 		const newUrl = new URL("/", req.nextUrl.origin)
// 		return Response.redirect(newUrl)
// 	}
// })

import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/auth.routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	// return;
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

	// Все пути в начале которых "/api/auth"
  	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	// Все публичные пути
  	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	// Все пути для аутентификации
  	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	// Ничего не делать если это путь с началом "/api/auth"
	if (isApiAuthRoute) {
		return;
	}

	// Если путь для аутентификации + пользователь залогинен - редирект на страницу по умолчанию
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return ;
	}

	// Если не залогинен и не публичная страница - редирект на страницу входа
	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}
		const encodedCallbackUrl = encodeURIComponent(callbackUrl);
		return Response.redirect(new URL(
			`/auth/login?callbackUrl=${encodedCallbackUrl}`,
			nextUrl
		));
	}

  return ;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}