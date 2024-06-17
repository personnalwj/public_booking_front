"use client";
import { fetchSpotsByCongregation, fetchTimeSlots } from "@/api/spots.api";
import BookingForm from "@/forms/booking.form";
import { useAxios } from "@/hooks/useAxios";
import React, { use, useEffect, useState } from "react";

interface BookingFormProps {
  onSubmit: (bookingData: BookingData) => void;
}

interface BookingData {
  name: string;
  date: string;
  // Add more fields as needed
}

const CreateBookingPage: React.FC<BookingFormProps> = () => {
  const axiosClient = useAxios();
  const [spots, setSpots] = useState<{value: string, label: string}[]>([]);
  const [timeSlots, setTimeSlots] = useState<{value: string, label: string}[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const getSpots = async () => {
      const fetchedSpots = await fetchSpotsByCongregation(axiosClient, "762ce1b2-08bc-458c-bf64-5b275f3e33f1");
      for (const spot of fetchedSpots) {
        setSpots((prevSpots) => [
          ...prevSpots,
          { value: spot.id, label: spot.title },
        ]);
      }
    };
    getSpots();
  }, [axiosClient]);

  useEffect(() => {
    const getTimeSlots = async () => {
      const data = await fetchTimeSlots(axiosClient);
      for (const slot of data) {
        setTimeSlots((prevSlots) => [
          ...prevSlots,
          { value: slot.id, label: `${slot.startTime} - ${slot.endTime}`  },
        ]);
      }
    };
    getTimeSlots();
  }, [axiosClient]);

  const handleSend = (bookingData: BookingData) => {
    // Send booking data to server
    console.log(bookingData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData: BookingData = {
      name,
      date,
      // Set other fields here
    };
  };

  return <BookingForm onSubmit={handleSend} spots={spots} timeSlots={timeSlots} />;
};

export default CreateBookingPage;
