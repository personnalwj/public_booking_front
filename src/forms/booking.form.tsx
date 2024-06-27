"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/business/combobox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format, set } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface BookingPayload {
  spotName: string;
  date: Date;
  timeSlot: string;
  companions: string;
}

const companions = [
  { value: "1", label: "Willy" },
  { value: "2", label: "Danielle" },
  { value: "3", label: "Dimah" },
  { value: "4", label: "Iwal" },
  { value: "5", label: "Hiyam" },
];
type BookingFormProps = {
  onSubmit: (bookingPayload: BookingPayload) => void;
  timeSlots: { value: string; label: string }[];
  spots: { value: string; label: string }[];
  cancel: () => void;
};

const BookingForm: React.FC<BookingFormProps> = ({
  timeSlots,
  spots,
  cancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingPayload>();

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  const onSubmit = (booking: BookingPayload) => {
    console.log(booking);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4 flex flex-col h-16 justify-around">
        <Label>Date</Label>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    `md:w-[500px] w-[250px] justify-start text-left font-normal`,
                    !value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? (
                    format(value, "PPP", { locale: fr })
                  ) : (
                    <span>Choisissez une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`md:w-[500px] w-[250px] p-0`}
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={
                    (date) => {
                      onChange(date?.toISOString() || "");
                    }
                  }
                  disabled={{
                    before: minDate,
                    after: maxDate,
                  }}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && (
          <span className="text-red-500 text-sm text-left">
            Vous devez choisir une date
          </span>
        )}
      </div>
      <div className="mb-4 flex flex-col h-16 justify-around item-start">
        <Label>Créneau</Label>
        <Controller
          name="timeSlot"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Combobox
              items={timeSlots}
              placeHolder="Choissiez un créneau"
              value={value}
              setValue={(value) => {
                onChange(value);
              }}
            />
          )}
        />
        {errors.timeSlot && (
          <span className="text-red-500 text-sm text-left">
            Vous devez choisir un créneau
          </span>
        )}
      </div>
      <div className="mb-4 flex flex-col h-16 justify-around">
        <Label>Spot</Label>
        <Controller
          name="spotName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Combobox
              items={spots}
              placeHolder="Choissiez un spot"
              value={value}
              setValue={(value) => {
                onChange(value);
              }}
            />
          )}
        />
        {errors.spotName && (
          <span className="text-red-500 text-sm text-left">
            Vous devez choisir un spot
          </span>
        )}
      </div>
      <div className="mb-4 flex flex-col h-16 justify-around">
        <Label>Compagnons</Label>
        <Controller
          name="companions"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Combobox
              items={companions}
              placeHolder="Choisissez un compagnon"
              value={value}
              setValue={(value) => {
                onChange(value);
              }}
            />
          )}
        />

        {errors.companions && (
          <span className="text-red-500 text-sm text-left">
            Vous devez entrer le nombre de personnes
          </span>
        )}
      </div>
      <div className="mb-4 flex justify-start">
        <Button type="submit" className="mr-1">
          Reservez
        </Button>
        <Button type="button" variant="destructive" onClick={cancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
