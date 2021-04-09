import { User, UserData } from "@types";

export const convertUserDataToUser = (userData: UserData): User => ({
  ...userData,
  initials: `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`,
});
