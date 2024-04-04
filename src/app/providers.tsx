"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UserResponse } from "@/types/user.type";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { UserProvider } from "./contexts/user.context";
import { appInfo } from "./config/appInfo";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const session = useSessionContext();
  useEffect(() => {
    const verifiedUser = async () => {
      if (session.loading === false && session.doesSessionExist && user === null) {
        await axios
        .get(`${appInfo.apiDomain}${appInfo.apiBasePath}/auth/profile`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };
    verifiedUser();
  },[user, session]);
  return (
      <UserProvider value={user}>
        {children}
      </ UserProvider>
  );
}
