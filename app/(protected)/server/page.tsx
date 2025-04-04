import { currentUser } from "@/lib/auth";


const ServerPage = async () => {
  const user = await currentUser();

  return ( 
    <p>
	 {user?.email}
    </p>
   );
}
 
export default ServerPage;