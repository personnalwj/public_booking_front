import { AxiosInstance } from "axios";

export async function fetchSpotsByCongregation(axiosClient: AxiosInstance, id: string) {
    try {
        const response = await axiosClient.get(`/spots/congregation/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching spots:', error);
        throw error;
    }
}

export async function fetchTimeSlots(axiosClient: AxiosInstance) {
    try {
        const response = await axiosClient.get(`/time-slots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching time slots:', error);
        throw error;
    }
}

export async function createSpot(axiosClient: AxiosInstance, spot: any) {
    try {
        const response = await axiosClient.post(`/spots`, spot);
        return response.data;
    } catch (error) {
        console.error('Error creating spot:', error);
        throw error;
    }
}