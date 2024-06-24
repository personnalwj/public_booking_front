"use client";
import { fetchSpotsByCongregation, fetchTimeSlots } from "@/api/spots.api";
import BookingForm from "@/forms/booking.form";
import { useAxios } from "@/hooks/useAxios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { set } from "date-fns";
import { se } from "date-fns/locale";
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
  const { getToken } = useKindeAuth();

  const [spots, setSpots] = useState<{ value: string; label: string }[]>([]);
  const [timeSlots, setTimeSlots] = useState<
    { value: string; label: string }[]
  >([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const getSpots = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      const fetchedSpots = await fetchSpotsByCongregation(
        token,
        "82620724-7e70-40f9-a35e-dda91ec3f6f2"
      );
      setSpots(fetchedSpots.map((spot: any) => ({ value: spot.id, label: spot.title })));
    };
    getSpots();
  }, [getToken]);

  useEffect(() => {
    const getTimeSlots = async () => {
      const fetchedTimeSlots = await fetchTimeSlots();
      setTimeSlots(
        fetchedTimeSlots.map((slot: any) => ({
          value: slot.id,
          label: `${slot.startTime} - ${slot.endTime}`,
        }))
      );
    };
    getTimeSlots();
  }, []);

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

  return (
    <BookingForm onSubmit={handleSend} spots={spots} timeSlots={timeSlots} />
  );
};

export default CreateBookingPage;
