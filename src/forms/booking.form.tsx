"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/business/combobox";
import { DatePicker } from "@/components/business/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface BookingData {
  name: string;
  date: string;
  // Add more fields as needed
}
const items = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

type BookingFormProps = {
  onSubmit: (bookingData: BookingData) => void;
  timeSlots: { value: string; label: string }[];
  spots: { value: string; label: string }[];
};

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, timeSlots, spots }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  console.log(spots);
  console.log('timeslots',timeSlots);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData: BookingData = {
      name,
      date,
      // Set other fields here
    };
    onSubmit(bookingData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h5 className="text-2xl font-bold text-center">Réservez un spot</h5>
      <div className="mb-4">
        <Label>Date</Label>
        <DatePicker className="w-full" />
      </div>
      <div className="mb-4">
        <Label>Créneaux</Label>
        <Combobox items={timeSlots} placeHolder="Choissisez un créneau"/>

      </div>
      <div className="mb-4">
        <Label>Spot</Label>
        <Combobox items={spots} placeHolder="Choissiez un spot"/>
      </div>
      <Button type="submit">Reservez</Button>
    </form>
  );
};

export default BookingForm;
