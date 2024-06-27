import apiClient from "@/utils/axios";
import { AxiosInstance } from "axios";
import { UUID } from "crypto";

export async function fetchSpotsByCongregation(token: string, id: string) {
  try {
    const response = await apiClient.get(`/spots/congregation/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching spots:", error);
    throw error;
  }
}

export async function fetchTimeSlots() {
  try {
    const response = await apiClient.get(`/time-slots`);
    return response.data;
  } catch (error) {
    console.error("Error fetching time slots:", error);
    throw error;
  }
}

export async function createSpot(
  token: string,
  body: {
    title: string;
    description: string;
    address: string;
    timeSlots: UUID[];
    congregation: string;
  }
) {
  try {
    const response = await apiClient.post(`/spots`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating spot:", error);
    throw error;
  }
}
