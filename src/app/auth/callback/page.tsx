"use client";

import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const CallbackPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      <Suspense fallback={<Loading />} />
    </div>
  );
};

export default CallbackPage;
