import { Congregation } from "@/types/congregation.type";
import axios from "axios";

export default async function createCongregation(
  congregation: Congregation
): Promise<{ congregation: Congregation | null; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await axios.post("/back-api/congregations", congregation);
    return { congregation: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, congregation: null };
  }
}
