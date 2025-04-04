import Image from "next/image";

import {SignOut } from "@/components/SignOutComp"
import {RoleGate} from "@/components/role-gate"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SignOut />
	   <RoleGate />
	   <a href="/auth/login">Login</a>	
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
