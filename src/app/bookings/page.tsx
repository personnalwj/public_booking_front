"use client";

import { fetchSpotsByCongregation, fetchTimeSlots } from "@/api/spots.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BookingForm from "@/forms/booking.form";
import { cn } from "@/lib/utils";
import IsAuthenticated from "@/providers/isAuthenticated";
import { BookingPayload } from "@/types/booking.type";
import { Transition } from "@headlessui/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BookingPage: React.FC = () => {
  const { getToken } = useKindeAuth();
  const [createBooking, setCreateBooking] = useState<boolean>(false);
  const [spots, setSpots] = useState<{ value: string; label: string }[]>([]);
  const [timeSlots, setTimeSlots] = useState<
    { value: string; label: string }[]
  >([]);

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
      setSpots(
        fetchedSpots.map((spot: any) => ({ value: spot.id, label: spot.title }))
      );
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

  const handleSend = (bookingData: BookingPayload) => {
    // Send booking data to server
    console.log(bookingData);
  };

  return (
    <IsAuthenticated>
      <div className="flex flex-col items-center justify-aroun">
        <div className="flex justify-end w-full my-2">
          <Button
            size="sm"
            onClick={() => setCreateBooking(true)}
            disabled={createBooking}
          >
            Réserver un Spot
          </Button>
        </div>
        <Transition
          show={createBooking}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="w-full"
        >
          {/* <div className="flex flex-col align-center shadow-md border md:w-3/4 w-full p-2 mx-auto"> */}
          {/* <h5 className="text-2xl font-bold text-center">Réservez un spot</h5>
          <BookingForm
            onSubmit={handleSend}
            spots={spots}
            timeSlots={timeSlots}
            cancel={() => setCreateBooking(false)}
          /> */}
          <Card className="w-full md:w-3/4 mx-auto my-4">
            <CardHeader className="text-center">
              <CardTitle>Reserve ton spot</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm
                onSubmit={handleSend}
                spots={spots}
                timeSlots={timeSlots}
                cancel={() => setCreateBooking(false)}
              />
            </CardContent>
          </Card>
          {/* </div> */}
        </Transition>
      </div>
      <Separator />
      <div className="flex items-center justify-between my-2">
        <h5 className="text-xl">Mes réservations</h5>
      </div>
    </IsAuthenticated>
  );
};

export default BookingPage;
