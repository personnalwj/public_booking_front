import Input from "@/app/components/input";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Listbox from "@/app/components/listbox";

const SpotForm = ({ timeSlots }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [timeslotsData, setTimeslotsData] = useState(timeSlots);
  const [selectedTimeslot, setSelectedTimeslot] = React.useState([]);

  useEffect(() => {
    setTimeslotsData(timeSlots);
  }, [timeSlots]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
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

      {timeslotsData ? (
        <div className="mb-4">
          <Listbox
            label="Créneaux disponibles pour ce spot"
            timeSlots={timeslotsData}
            {...register("timeslots", { required: true })}
          />
          {errors.timeslot && (
            <span className="text-red-500">Timeslot is required</span>
          )}
        </div>
      ) : (
        <></>
      )}

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Create Spot
      </button>
    </form>
  );
};

export default SpotForm;
