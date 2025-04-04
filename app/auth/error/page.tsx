import { useSearchParams } from "next/navigation"
// import Sentry from "@sentry/nextjs";
import { Result, Button } from "antd";

const AuthErrorPage = () => {

	const search = useSearchParams()
	const error = search.get("error")
	
	// try{
	// 	throw new Error(error as string)
	// }catch(e){
		// Sentry.captureException(e);
		
	// }

  return ( 
	<>
				<Result
				title="400"
				subTitle="Ошибка браузера"
				extra={<Button type="primary" href='/'>На главную</Button>}
			/>
	</>
  );
};
 
export default AuthErrorPage;
