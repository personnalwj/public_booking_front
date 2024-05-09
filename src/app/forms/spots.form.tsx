import Input from "@/app/components/input";
import { Listbox } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import React, { use, useEffect, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import Button from "../components/button";
import { Congregation, Spot, TimeSlot } from "@/types/congregation.type";
import { create } from "domain";
import { createSpot } from "../apis/spot.api";
import { useAxios } from "../utils/axios";
import { UUID } from "crypto";
// import Listbox from "@/app/components/listbox";

const SpotForm = ({
  timeSlots,
  handleSubmit: handleSubmitParent,
  congregation,
}: {
  timeSlots: TimeSlot[];
  handleSubmit: (spot: Spot) => void;
  congregation: Congregation;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Spot>();
  const axiosClient = useAxios();
  const [timeSlotPayload, setTimeSlotPayload] = useState<TimeSlot[]>(timeSlots);
  const [selectedTimeslot, setSelectedTimeslot] = React.useState<TimeSlot[]>(
    []
  );

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
        console.log('data', data.timeSlots.map((slot) => slot.id));
        const body = {
            title: data.title,
            description: data.description,
            address: data.address,
            timeSlots: data.timeSlots.map((slot) => slot.id as UUID),
            congregation: congregation.id,
        };
        const result = await createSpot(axiosClient, body);
        console.log(' created spot', result);
        handleSubmitParent(data);
        reset();
        setSelectedTimeslot([]);    }
    catch (error) {
      console.log(error);
    }
  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h5 className="text-2xl font-bold text-center">Créer un spot</h5>
      <div className="mb-4">
        <Input
          type="text"
          id="title"
          label="Titre du spot"
          {...register("title", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-bold">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}
      </div>
      <div className="mb-4">
        <Input
          type="text"
          label="Addresse"
          id="address"
          {...register("address", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <span className="text-red-500">Address is required</span>
        )}
      </div>
      {selectedTimeslot.length > 0 && (
        <div className="mb-4">
          <label htmlFor="timeslot" className="block mb-2 font-bold">
            Créneaux
          </label>
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
                <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                <span className="text-red-500">
                  Vous devez définir des créneaux
                </span>
              )}
            </div>
          )}
        />
      )}
      <Button>Créer le spot</Button>
    </form>
  );
};

export default SpotForm;
