"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button, Divider } from "antd";
import { DEFAULT_LOGIN_REDIRECT } from "@/auth.routes";
import { GoogleOutlined } from "@ant-design/icons";

export const GoogleAuthButton = () => {
	const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
	setLoading(true);
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
	<>
	<Button block type="primary" htmlType="submit"  onClick={() => onClick("google")} icon={<GoogleOutlined />} color="blue"  variant="solid" 
	disabled={loading} loading={loading}
	>
	Войти с Google
   </Button>
	<Divider>или</Divider>
   </>
  )
};
