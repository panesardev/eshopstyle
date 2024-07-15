import { UserStateType } from "./user.interface";

export function initialUserState(): UserStateType {
  return {
    products: [],
  };
}