"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

import { signOut } from "next-auth/react"

const ClientPage = () => {
// На клиенте есть особенность!⛔ = для мгновенной реакции (без необходимости презагружать страницу) на Выход переключением между кнопками входа и выхода нужно использовать import { signOut } from "next-auth/react"

  const user = useCurrentUser();

  return ( 
    <>
		{user ? 
				<button onClick={() => signOut()}>Выйти</button>
			 : 
				<a href="/auth/login">Войти</a>
			
		}
	</>
   );
}
 
export default ClientPage;