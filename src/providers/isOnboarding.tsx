"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useRouter } from "next/navigation";

type RolesClaim = {
  name: string;
  value: {
    id: string;
    key: string;
    name: string;
  }[];
};

type PermissionsClaim = {
    string: string[];
};

export default function IsOnboarding({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { isAuthenticated, isLoading, getClaim, getPermission } = useKindeAuth();
    const router = useRouter();

    // if (isAuthenticated) {
    //     const claim = getClaim("roles", "access_token") as RolesClaim;
    //     if (claim.value && claim.value.some((role) => role.key === "admin") && getPermission("congregation:create")) {
    //         return <>{children}</>;
    //     }
    // }
    // if (!isLoading && isAuthenticated) {
    //     router.push("/");
    // }
    return <>{children}</>;
}
