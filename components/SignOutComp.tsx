'use client'
import { logout } from "@/actions/logout";
 
export function SignOut() {
	const onClick = () => {
		logout();
	   };
  return (

      <button onClick={onClick}>Sign Out</button>

  )
}