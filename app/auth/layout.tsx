const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="authentication w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-7">
		<div className="bg-gray-100 p-8 rounded-xl max-w-[360px] w-4/5">
      		{children}
		</div>
    </div>
   );
}
 
export default AuthLayout;