import { User } from "@/types/user.type";
import { AxiosInstance } from "axios";

export default async function createUser(
  axiosClient: AxiosInstance,
  user: User
): Promise<{ user: User | undefined; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await axiosClient.post("/users", user);
    return { user: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, user: undefined };
  }
}