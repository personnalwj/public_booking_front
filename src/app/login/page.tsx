"use client";

import React, { useEffect, useState } from "react";
import signInClicked from "./login";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler, set } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const signInErrors = await signInClicked(data.email, data.password);
      if (signInErrors.length === 0) {
        setIsLogin(true);
        return;
      }
      setApiErrors(signInErrors);
    } catch (error) {
      setApiErrors([...apiErrors, "Une erreur s'est produite, veuillez contactez votre administrateur."]);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-xl shadow-slate-100 rounded px-8 pt-6 pb-8 mb-4 w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        {apiErrors.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold mr-1">Erreur:</strong>
            <span className="block sm:inline">{apiErrors.join(", ")}</span>
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Votre email
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.email?.type === "required" && "Email requis"}
          </p>
          <p className="text-red-500 text-xs italic">
            {errors.email?.type === "pattern" && "Email invalide"}
          </p>
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
            {...register("password", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.type === "required" && "Mot de passe requis"}
          </p>
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
