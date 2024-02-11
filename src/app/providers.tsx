'use client'

import { SessionProvider } from "next-auth/react";
import SSRProvider from 'react-bootstrap/SSRProvider';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
        <SessionProvider>
            {children}
        </SessionProvider>
    </SSRProvider>

    )
}