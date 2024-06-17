"use client";

import Loading from "@/components/ui/loading";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from "react";

const LoginPage: React.FC = () => {
  const { login, isLoading } = useKindeAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading) {
      login({
        authUrlParams: {
          login_hint: searchParams.get('email'),
        },
      });
    }
  }, [isLoading, searchParams, login]);

  return (
    <div>
      <Suspense fallback={<Loading />} />
    </div>
  );
};

export default LoginPage;
