import api from "@/app/utils/axios";
import { Congregation } from "@/types/congregation.type";
import axios from "axios";

export default async function createCongregation(
  congregation: Congregation
): Promise<{ congregation: Congregation | null; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await api.post("/congregations", congregation);
    return { congregation: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: null };
  }
}

export async function updateCongregation(
  id: string,
  congregation: Partial<Congregation>
): Promise<{ congregation: Congregation | null; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await api.patch(`/congregations/${id}`, congregation);
    return {
      congregation: response.data,
      errors: errors,
    };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: null };
  }
}
