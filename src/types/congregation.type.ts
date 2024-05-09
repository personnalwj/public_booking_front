export type Congregation = {
    id: string;
    name: string;
    address: string;
    responsible: string;
};

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