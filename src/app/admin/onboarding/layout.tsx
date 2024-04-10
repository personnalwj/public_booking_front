
"use client";

import { CustomSessionAuth } from '@/app/components/sessionAuth';
import { useUserContext } from 'supertokens-auth-react';
import { SessionAuth, useSessionContext } from 'supertokens-auth-react/recipe/session';
import { AccessDeniedScreen } from 'supertokens-auth-react/recipe/session/prebuiltui';
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionAuth accessDeniedScreen={AccessDeniedScreen}>
        {children}
    </SessionAuth>
  );
}
