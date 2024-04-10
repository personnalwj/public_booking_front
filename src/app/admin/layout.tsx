
"use client";
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionAuth>
      {children}
    </SessionAuth>
  );
}
