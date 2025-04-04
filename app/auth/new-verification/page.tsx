'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Result } from "antd";

import { newVerification } from "@/actions/new-verification";

const NewVerificationPage = () => {

	const [loading, setLoading] = useState<{status: "success" | "error" | "warning", message: string}>({status: 'warning', message:""});

	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	useEffect(() => {


		if (token) {
			newVerification(token).then((result) => {
				setLoading(result);
			})
		}
	}, [token]);

  return ( 
  
	<Result
		status={loading.status}
		title={loading.message}
		// subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
		extra={[
		<Button type="primary" key="console" href="/">
		На главную
		</Button>
		]}
	/>


   );
}
 
export default NewVerificationPage;