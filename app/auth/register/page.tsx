'use client';
import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { register } from '@/actions/register';

// import { useForm } from "react-hook-form";

// import { FormItem } from "react-hook-form-antd";
// import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

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


const RegisterPage = () => {
	const [currentState, actionFunction, isPending] = useActionState(register, initialState);

	console.log(currentState);
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	   };

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Регистрация Kopi34.ru</h1>
      {/* <Form
	 action={actionFunction}
      name="login"
      initialValues={{ remember: true }}
	 //  style={{ maxWidth: 360 }}
	 
      onFinish={onFinish}
	 > */}

    <form 
		action={actionFunction} >

	 <div className="flex flex-col gap-4">
		<div >
			<Input prefix={<MailOutlined />} placeholder="Email"  name="email"/>

			{currentState?.errors?.email && ( <p className="authentication__error-message">{currentState.errors.email}</p> )}
		</div>
		{/* <div >
			<Input prefix={<UserOutlined />} placeholder="Имя пользователя" name="username"/>
			{currentState?.errors?.username && ( <p className="authentication__error-message">{currentState.errors.username}</p> )}

		</div> */}
		<div>
			<Input prefix={<PhoneOutlined />} placeholder="Телефон (не обязательно)" name="phone"/>
			{currentState?.errors?.phone && ( <p className="authentication__error-message">{currentState.errors.phone}</p> )}
		</div>
		<div>
			<Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" name="password"/>
			{currentState?.errors?.password && ( <p className="authentication__error-message">{currentState.errors.password}</p> )}
		</div>
		<div>
			<Input.Password  prefix={<LockOutlined />} placeholder="Подтвердите пароль"  name="confirm"/>

			{currentState?.errors?.confirm && ( <p className="authentication__error-message">{currentState.errors.confirm}</p> )}
		</div>
		<div >
        <Button block type="primary" htmlType="submit" disabled={isPending} loading={isPending}>
          Зарегистрироваться*
        </Button>
      </div>
</div>
    {/* </Form> */}
    </form>
    {currentState?.success && <p className="text-green-600">{currentState.success}</p>}
	{currentState?.response && <p className="text-yellow-600">{currentState.response}</p>}
				
    <p className="text-xs w-full text-center mt-2">* Регистрируясь, вы принимаете <a href="https://kopi34.ru/oferta" className="text-blue-500">политику конфиденциальности</a></p>
    </>
  );
}
 
export default RegisterPage;