import type { User } from "./dtos/auth.dto";

/**
 * Retrieves the currently logged in user synchronously from local storage.
 * @returns The User if found and valid, otherwise null.
 */
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};