import React from "react";

const SpotComponent = ({
  spot,
}: {
  spot: { title: string; address: string };
}) => {
  return (
    <div className="bg-blue-500 p-4 rounded-lg">
      <h2 className="text-white text-lg font-bold">{spot.title}</h2>
      <p className="text-white">{spot.address}</p>
    </div>
  );
};

export default SpotComponent;
