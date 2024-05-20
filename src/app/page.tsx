import Link from "next/link";

export default function Home() {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold">Bienvenue sur votre espace de reservation de spot</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href='/bookings'> <button className="btn btn-primary" >Réservez un spot</button></Link>
        </div>
      </div>
    </div>
  );
}
