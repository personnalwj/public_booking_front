
export type TimeSlot = {
    id: string;
    startTime: string;
    endTime: string;
};

export type Spot = {
    id: string;
    title: string;
    address: string;
    description: string;
    congregation: string;
    timeSlots: TimeSlot[];
}

export type SpotPayload = {
  title: string;
  address: string;
  description: string;
  congregation: string;
  timeSlots: string[];
};
