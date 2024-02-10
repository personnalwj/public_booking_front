"use client";

import { signIn, signOut, useSession } from "next-auth/react"

export default function Component() {
const { data: session } = useSession()
if (session) {
    const email = session.user?.email ?? 'Unknown';
    return (
        <>
            Signed in as {email} <br />
            <h1>Profile</h1>
            <p>Name: {session.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}