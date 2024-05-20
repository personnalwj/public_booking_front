import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Logique de création d'utilisateur ici
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="given_name" className="block mb-2 font-medium text-gray-700">
          Nom
        </Label>
        <Input
          type="text"
          id="given_name"
          {...register("given_name", { required: true })}
        />
        {errors.given_name && <p className="text-red-500 text-sm"> Le champs est requis </p>}
      </div>
      <div className="mb-4">
        <Label
          htmlFor="family_name"
          className="block mb-2 font-medium text-gray-700"
        >
          Prénom
        </Label>
        <Input
          type="text"
          id="family_name"
          {...register("family_name", { required: true })}
        />
        {errors.family_name && <p className="text-red-500 text-sm"> Le champs est requis </p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-500 text-sm">Le champs est requis</p>}
      </div>
      <Button type="submit">Créer</Button>
    </form>
  );
};

export default UserForm;
