import { signOut } from "@/auth"
import {SignOut } from "@/components/SignOutComp"
import {RoleGate} from "@/components/role-gate"

import { currentRole, currentUser } from "@/lib/auth";
// import { signOut } from "next-auth/react"
 
export default async function Home() {

	const d = await currentRole()
	const c = await currentUser()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SignOut />
	   {/* <RoleGate /> */}\
	   {d && d}{c && c.email}
	   <a href="/auth/login">Login</a>	
	   <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
