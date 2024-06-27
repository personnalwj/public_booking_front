import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Congregation } from "@/types/congregation.type";
import React, { use, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import createCongregation, { updateCongregation } from "@/api/congregations.api";
import { Label } from "@/components/ui/label";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const CongregationForm: React.FC<{
  congregation: Congregation | undefined;
  handleSumit: (data: any) => void;
}> = ({ congregation, handleSumit }) => {
  const [token, setToken] = useState<string>('');
  const { getToken } = useKindeAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Congregation>();
  const [congregationPayload, setcongregationPayload] = useState<
    Congregation | undefined
  >(congregation);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      setToken(token);
    }
    fetchToken();
  }, [getToken]);

  useEffect(() => {
    if (congregation) {
      setValue("name", congregation.name);
      setValue("address", congregation.address);
      setcongregationPayload(congregation);
    }
  }, [congregation, setValue]);
  const onSubmit: SubmitHandler<Congregation> = async (data) => {
    try {
      if (congregationPayload) {
        const result = await updateCongregation(
          token,
          congregationPayload.id,
          { ...congregationPayload, ...data }
        );
        handleSumit(result.congregation);
        setcongregationPayload(result.congregation);
        return null;
      }
      const result = await createCongregation(token, data);
      handleSumit(result.congregation);
      setcongregationPayload(result.congregation);
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
            <Label htmlFor="name">Nom de l&apos;assemblée</Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-400 text-xs italic">Ce champ est requis</p>
            )}
          </div>
          <div className="sm:col-span-3">
            <Label htmlFor="address">Adresse</Label>
            <Input
              type="text"
              id="address"
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

export default CongregationForm;
