"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useContext } from "react";

export default function Home() {
  const { user } = useKindeAuth()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome {user && user.given_name}</h1>
      <p className="text-lg text-gray-600">Admin page is comming soon!</p>
    </div>
  );
}
