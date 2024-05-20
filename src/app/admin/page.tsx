import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
      <div className="flex-col">
        <div>
          <h2 className="text-xl font-bold mb-4">Statistiques</h2>
          <Separator orientation="horizontal" className="my-1" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-sm shadow-md">
              <h3 className="text-lg font-semibold mb-2">Utilisateurs</h3>
              <p className="text-3xl font-bold">10</p>
            </div>
            <div className="bg-white p-4 rounded-sm shadow-md">
              <h3 className="text-lg font-semibold mb-2">Spots</h3>
              <p className="text-3xl font-bold">10</p>
            </div>
            <div className="bg-white p-4 rounded-sm shadow-md">
              <h3 className="text-lg font-semibold mb-2">Réservations</h3>
              <p className="text-3xl font-bold">10</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">
                Membres de votre assemblée
              </h2>
              <Button size="sm"><Link href='/admin/users/create'>Inviter un membre</Link></Button>
            </div>
            <Separator orientation="horizontal" className="my-1" />
            <div className="bg-white p-4 rounded-sm">
              <h3 className="text-lg font-semibold mb-2">Listes des membres de votre assemblées</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
