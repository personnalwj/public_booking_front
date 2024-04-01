"use client";

import { useContext, useEffect } from "react";
import { doesSessionExist, getAccessToken } from "supertokens-web-js/recipe/session";
import { UserContext, useUser } from "./contexts/user.context";

export default function Home() {
  const user = useContext(UserContext);
  console.log('************** user ************\n', user);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome {user && user.firstName}</h1>
      <p className="text-lg text-gray-600">This page is comming soon!</p>
    </div>
  );
}
