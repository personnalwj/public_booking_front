import { Input } from "@/components/ui/input";
import { Listbox } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Congregation } from "@/types/congregation.type";
import { createSpot } from "@/api/spots.api";
import { UUID } from "crypto";
import { Spot, TimeSlot } from "@/types/spot.type";
import { Label } from "@/components/ui/label";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const SpotForm = ({
  timeSlots,
  handleSubmit: handleSubmitParent,
  congregation,
}: {
  timeSlots: TimeSlot[];
  handleSubmit: (spot: Spot) => void;
  congregation?: Congregation;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Spot>();
  const { getToken } = useKindeAuth();
  const [token, setToken] = useState<string>("");
  const [timeSlotPayload, setTimeSlotPayload] = useState<TimeSlot[]>(timeSlots);
  const [selectedTimeslot, setSelectedTimeslot] = React.useState<TimeSlot[]>(
    []
  );

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  useEffect(() => {
    setTimeSlotPayload(timeSlots);
  }, [timeSlots]);

  const handleRemoveTimeSlot = (timeslot: TimeSlot) => {
    const updatedTimeSlots = selectedTimeslot.filter(
      (slot: any) => slot.id !== timeslot.id
    );
    setSelectedTimeslot(updatedTimeSlots);
    setValue("timeSlots", updatedTimeSlots);
  };
  const onSubmit = async (data: Spot) => {
    try {
      if (!congregation) return;
      const body = {
        title: data.title,
        description: data.description,
        address: data.address,
        timeSlots: data.timeSlots.map((slot) => slot.id as UUID),
        congregation: congregation.id,
      };
      await createSpot(token, body);
      handleSubmitParent(data);
      reset();
      setSelectedTimeslot([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="text-2xl font-bold text-center">Créer un spot</h5>
      <div className="mb-4">
        <Label htmlFor="title">Titre</Label>
        <Input
          type="text"
          id="title"
          placeholder="Nommez ce spot"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500 text-sm text-left">
            Veuillez donner un titre à ce spot
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 textarea focus:ring-indigo-500 text-sm"
          placeholder="Décrivez ce spot et donnez des informations utiles pour les frères et soeurs."
        />
        {errors.description && (
          <span className="text-red-500 text-sm text-left">
            Veuillez entrer une description de cet emplacement
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="address">Adresse</Label>
        <Input
          type="text"
          id="address"
          {...register("address", { required: true })}
          placeholder="Entrez une adresse ou une localisation pour ce spot"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        {errors.address && (
          <span className="text-red-500 text-sm text-left">
            Une adresse est requise pour créer un spot
          </span>
        )}
      </div>
      {selectedTimeslot.length > 0 && (
        <div className="mb-4">
          <Label htmlFor="timeslot">Créneaux</Label>
          <div className="flex w-full rounded-md shadow-lg items-center flex-wrap max-h-40 overflow-auto border p-2">
            {selectedTimeslot.map((timeslot: TimeSlot) => (
              <span
                key={timeslot.id}
                className="p-1 border border-gray-300 rounded-md bg-indigo-700 text-indigo-100 mr-2 mb-2 text-sm flex items-center justify-center"
              >
                <small>{`${timeslot.startTime}-${timeslot.endTime}`}</small>
                <XCircleIcon
                  className="h-4 w-4 ml-1"
                  onClick={() => {
                    handleRemoveTimeSlot(timeslot);
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      )}
      {timeSlotPayload && (
        <Controller
          name="timeSlots"
          control={control}
          rules={{ required: true }}
          defaultValue={selectedTimeslot}
          render={({ field: { onChange, value } }) => (
            <div className="mb-4">
              <Listbox
                value={selectedTimeslot}
                multiple
                onChange={(value) => {
                  setSelectedTimeslot(value);
                  onChange(value);
                }}
                as={"div"}
              >
                <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                  Choisissez vos créneaux
                </Listbox.Button>
                <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {timeSlotPayload.map((timeslot: TimeSlot) => (
                    <Listbox.Option
                      key={timeslot.id}
                      value={timeslot}
                      className={({ active, selected }) =>
                        `${
                          active
                            ? "text-white bg-indigo-700"
                            : "text-indigo-900"
                        }
                                cursor-default select-none relative py-2 pl-3 pr-9
                    ${selected ? "bg-gray-200" : ""}
                                `
                      }
                    >
                      {`${timeslot.startTime}-${timeslot.endTime}`}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
              {errors.timeSlots && (
                <span className="text-red-500 text-sm text-left">
                  Vous devez définir des créneaux
                </span>
              )}
            </div>
          )}
        />
      )}
      <Button className="btn text-sm">Créer le spot</Button>
    </form>
  );
};

export default SpotForm;
