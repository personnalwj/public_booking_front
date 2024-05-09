import api from "@/app/utils/axios";
import { Congregation } from "@/types/congregation.type";
import { AxiosInstance } from "axios";

export default async function createCongregation(
  axiosClient: AxiosInstance,
  congregation: Congregation
): Promise<{ congregation: Congregation | null; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await axiosClient.post("/congregations", congregation);
    return { congregation: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: null };
  }
}

export async function updateCongregation(
  axiosClient: AxiosInstance,
  id: string,
  congregation: Partial<Congregation>
): Promise<{ congregation: Congregation | null; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await axiosClient.patch(
      `/congregations/${id}`,
      congregation
    );
    return {
      congregation: response.data,
      errors: errors,
    };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: null };
  }
}

export async function fetchUserCongregations(axiosClient: AxiosInstance) {
  try {
    const response = await axiosClient.get(`/users/congregations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user congregations:", error);
    throw error;
  }
}
