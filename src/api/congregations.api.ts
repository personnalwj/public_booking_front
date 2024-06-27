import { Congregation } from "@/types/congregation.type";
import apiClient from "@/utils/axios";

export default async function createCongregation(
  token: string,
  congregation: Congregation
): Promise<{ congregation: Congregation | undefined; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await apiClient.post("/congregations", congregation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { congregation: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: undefined };
  }
}

export async function updateCongregation(
  token: string,
  id: string,
  congregation: Partial<Congregation>
): Promise<{ congregation: Congregation | undefined; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await apiClient.patch(
      `/congregations/${id}`,
      congregation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      congregation: response.data,
      errors: errors,
    };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: undefined };
  }
}

export async function fetchUserCongregations(token: string) {
  try {
    const response = await apiClient.get(`/users/congregations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user congregations:", error);
    throw error;
  }
}
