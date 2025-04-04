/**
 * Путь по умолчанию для перехода после входа
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";

/**
 * Публичные пути, которые не нуждаются в аутентификации
 * 
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification"
];

/**
 * Пути аутентификации
 * 
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * Префикс путей, которые используются для API аутентификации
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
