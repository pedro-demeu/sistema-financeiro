import { atom } from "recoil";

export interface LoginSchema {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const DEFAULT_VALUES: LoginSchema = {
  username: "",
  password: "",
  rememberMe: true,
};

export const UserLoggedAtom = atom<LoginSchema>({
  key: "UserLoggedAtom",
  default: DEFAULT_VALUES,
});
