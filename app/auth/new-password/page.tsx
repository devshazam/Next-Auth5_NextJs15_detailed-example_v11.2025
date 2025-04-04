'use client';
import { useSearchParams } from "next/navigation";

import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { newPassword } from '@/actions/new-password';
// import { useForm } from "react-hook-form";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/config";

const initialState = {
	success: "",
	response: "",
	errors: {
		password: "",
		token: ""
	},
   };


const NewPassword = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [currentState, actionFunction, isPending] = useActionState(newPassword, initialState);

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Восстановление пароля</h1>

    <form action={actionFunction} >
    	<input hidden name="token" value={token || ''} readOnly/>
	 <div className="flex flex-col gap-4">
		
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
	</p>
				
    <p className="text-sm w-full mt-2"><a href="/auth/register" className="text-blue-500">Зарегистрироваться</a></p>
    </>
  );
}
 
export default NewPassword;