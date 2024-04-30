import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { Congregation } from "@/types/congregation.type";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import createCongregation, { updateCongregation } from "./api";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { redirect } from "next/navigation";

const CreateCongregation: React.FC<{
  congregation: Congregation | null;
  handleSumit: (data: any) => void;
}> = ({ congregation, handleSumit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Congregation>();

  const [congregationData, setCongregationData] = useState<Congregation | null>(
    congregation
  );

  useEffect(() => {
    if (congregation) {
      setValue('name', congregation.name);
      setValue('address', congregation.address);
      setCongregationData(congregation);
    }
  }, [congregation, setValue]);
  const onSubmit: SubmitHandler<Congregation> = async (data) => {
    try {
      if(congregationData) {
        const result = await updateCongregation(congregationData.id, { ...congregationData, ...data });
        handleSumit(result.congregation);
        setCongregationData(result.congregation);
        return null;
      }
      const result = await createCongregation(data);
      handleSumit(result.congregation);
      setCongregationData(result.congregation);
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border p-5 border-slate-200 shadow-md">
      <h1 className="text-2xl font-bold text-center">Créer une assemblée</h1>
      <p className="text-center text-gray-500">
        Remplissez le formulaire pour créer votre assemblée et permettre aux
        frères et soeurs de se connecter à leur tour.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Nom de votre assemblée"
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-400 text-xs italic">Ce champ est requis</p>
            )}
          </div>
          <div className="sm:col-span-3">
            <Input
              type="text"
              id="address"
              label="Adresse de l'assemblée"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-400 text-xs italic">Ce champ est requis</p>
            )}
          </div>
          <Button>Envoyer</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCongregation;
