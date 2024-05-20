import { AxiosInstance } from "axios";
import { UUID } from "crypto";

export async function fetchSpotsByCongregation(
  axiosClient: AxiosInstance,
  id: string
) {
  try {
    const response = await axiosClient.get(`/spots/congregation/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching spots:", error);
    throw error;
  }
}

export async function fetchTimeSlots(axiosClient: AxiosInstance) {
  try {
    const response = await axiosClient.get(`/time-slots`);
    return response.data;
  } catch (error) {
    console.error("Error fetching time slots:", error);
    throw error;
  }
}

export async function createSpot(
  axiosClient: AxiosInstance,
  body: {
    title: string;
    description: string;
    address: string;
    timeSlots: UUID[];
    congregation: string;
  }
) {
  try {
    const response = await axiosClient.post(`/spots`, body);
    return response.data;
  } catch (error) {
    console.error("Error creating spot:", error);
    throw error;
  }
}
