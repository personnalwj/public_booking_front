import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold">Bienvenue sur votre espace de reservation de spot</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href='/bookings'> <Button className="btn btn-primary" >Réservez un spot</Button></Link>
        </div>
      </div>
    </div>
  );
}
