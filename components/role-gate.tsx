"use client";
import { useSession } from "next-auth/react";


import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { FormError } from "@/components/form-error";


export const RoleGate = () => {
	const { update } = useSession();
  const role = useCurrentRole();
  const user = useCurrentUser();


    return (
      <p>{role && role}{user && user.email}</p>
    )


};
