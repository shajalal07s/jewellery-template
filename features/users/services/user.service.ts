import { apiRequest } from "@/lib/api";
import type { User } from "@/types/user";

export async function getProfile() {
  return apiRequest<User>({
    method: "GET",
    url: "/users/me",
  });
}

export async function updateProfile(data: Partial<Pick<User, "name" | "avatar">>) {
  return apiRequest<User>({
    method: "PATCH",
    url: "/users/me",
    data,
  });
}
