import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClaimValue, useSessionContext } from "supertokens-auth-react/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";

function AuthenticatedComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const  claim = useClaimValue(UserRoleClaim);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (
      !claim.loading && claim.doesSessionExist
    ) {
      const roles = claim.value;
      if (roles?.includes("admin")) {
        setIsAdmin(true);
      }
    }
  }, [claim]);

  if (isAdmin) {
    return <>{children}</>;
  }
  if (!claim.loading && !claim.doesSessionExist) {
    redirect("/");
  }
}

export default AuthenticatedComponent;
