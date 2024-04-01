"use client";

import React, { useEffect, useState } from "react";
import signInClicked from "./login";
import { useUser, useUserDispatch } from "../contexts/user.context";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useUserDispatch();
  const user = useUser();

  useEffect(() => {
      if (user.id) {
          console.log('in useeffect user', user);
          redirect('/');
      }
  },[user]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle login logic here
    try {
      const user = await signInClicked(email, password);
      if (user) {
        dispatch({
          type: "added",
          payload: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.emails[0],
            id: user.id,
          },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-xl shadow-slate-100 rounded px-8 pt-6 pb-8 mb-4 w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Votre email
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-900 hover:bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
