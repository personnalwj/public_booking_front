import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

function AuthenticatedComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSessionContext();
  const [isAuthenticated, setIsAuthenticated] = useState(
    session.loading === false && session.doesSessionExist
  );

  useEffect(() => {
    if (
      session.loading === false &&
      session.doesSessionExist
    ) {
      setIsAuthenticated(true);
    }
  }, [session]);

  if (isAuthenticated) {
    return <>{children}</>;
  }
  if (!session.loading && !session.doesSessionExist) {
    redirect("/login");
  }
}

export default AuthenticatedComponent;
