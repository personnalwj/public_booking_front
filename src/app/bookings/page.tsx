'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IsAuthenticated from "@/providers/isAuthenticated";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Link from "next/link";

const BookingPage: React.FC = () => {
    const { user } = useKindeAuth();
    return (
        <IsAuthenticated>
            <div className="flex items-center justify-between my-2">
                <h5 className="text-xl">Mes réservations</h5>
                <Button size='sm'><Link href='/bookings/create'> Réserver un Spot </Link></Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between my-2">
                <h5 className="text-xl">Mes réservations</h5>
            </div>
        </IsAuthenticated>
    );
};

export default BookingPage;