'use client';
import { useSearchParams } from "next/navigation";

import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { reset } from '@/actions/reset';
// import { useForm } from "react-hook-form";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/config";

const initialState = {
	success: "",
	response: "",
	errors: {
		email: "",
		phone: "",
		password: "",
		confirm: "",
	},
   };


const Reset = () => {


	const [currentState, actionFunction, isPending] = useActionState(reset, initialState);

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Восстановление пароля</h1>

    <form action={actionFunction} >
	 <div className="flex flex-col gap-4">
		<div >
			<Input prefix={<MailOutlined />} placeholder="Email"  name="email"/>

			{currentState?.errors?.email && ( <p className="authentication__error-message">{currentState.errors.email}</p> )}
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
 
export default Reset;