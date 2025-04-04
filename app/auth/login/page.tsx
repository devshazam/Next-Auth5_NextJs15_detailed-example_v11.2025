'use client';
import { useSearchParams } from "next/navigation";

import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { login } from '@/actions/login';
// import { useForm } from "react-hook-form";
import { DEFAULT_LOGIN_REDIRECT } from "@/auth.routes";
// import { FormItem } from "react-hook-form-antd";
// import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";

const initialState = {
	success: "",
	response: "",
	errors: {
		// username: "",
		email: "",
		phone: "",
		password: "",
		confirm: "",
	},
   };


const LoginPage = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
	  ? "Email уже использован с другим провайдером!"
	  : "";

	const [currentState, actionFunction, isPending] = useActionState(login, initialState);

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Вход Kopi34.ru</h1>

	<GoogleAuthButton />
    <form action={actionFunction} >
		<input hidden name="callbackUrl" value={callbackUrl || DEFAULT_LOGIN_REDIRECT} readOnly/>
	 <div className="flex flex-col gap-4">
		<div >
			<Input prefix={<MailOutlined />} placeholder="Email"  name="email"/>

			{currentState?.errors?.email && ( <p className="authentication__error-message">{currentState.errors.email}</p> )}
		</div>
		<div>
			<Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" name="password"/>
			{currentState?.errors?.password && ( <p className="authentication__error-message">{currentState.errors.password}</p> )}
			<p className="text-sm w-full mt-2 text-right"><a href="/auth/register" className="text-blue-500">Забыл пароль</a></p>
		</div>
		<div >
        <Button block type="primary" htmlType="submit" disabled={isPending} loading={isPending}>
          Войти
        </Button>
      </div>
</div>
    {/* </Form> */}
    </form>
    <p className="text-yellow-600 text-sm text-center mt-2">
		{/* {currentState?.success && <p className="text-green-600">{currentState.success}</p>} */}
		{currentState?.response && currentState.response}
		{urlError && urlError}
	</p>
				
    <p className="text-sm w-full mt-2"><a href="/auth/register" className="text-blue-500">Зарегистрироваться</a></p>
    </>
  );
}
 
export default LoginPage;