import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { Congregation } from "@/types/congregation.type";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import createCongregation from "./create";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { redirect } from "next/navigation";

const CreateCongregation: React.FC<{ congregation?: Congregation }> = ({
  congregation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Congregation>();
  const session = useSessionContext();
  const [congregationData, setCongregationData] =
    React.useState<Congregation | undefined>(congregation);

  const onSubmit: SubmitHandler<Congregation> = async (data) => {
    if (session.loading === false) {
      await createCongregation({ ...data, responsible: session.userId });
    }
    redirect("/login ");
  };

  return (
    <div className="border p-5 border-slate-200 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Nom de votre assemblée"
              type="text"
              id="name"
              value={congregationData?.name}
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
              value={congregationData?.address}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-400 text-xs italic">Ce champ est requis</p>
            )}
          </div>
          <Button>Créer</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCongregation;
