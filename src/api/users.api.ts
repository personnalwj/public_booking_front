import { User } from "@/types/user.type";
import apiClient from "@/utils/axios";

export default async function createUser(
  token: string,
  user: User
): Promise<{ user: User | undefined; errors: string[] }> {
  const errors: string[] = [];
  try {
    const response = await apiClient.post("/users", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user: response.data, errors: errors };
  } catch (error: any) {
    errors.push(error.message);
    return { errors, user: undefined };
  }
}
