import { atom } from "recoil";
import { Transaction } from './transactions';

export type FeedbackType = {
  color: undefined | string,
  message: null | string
}

export type UserType = {
  username: string;
  email: string;
  password: string;
  id: string;
  finances: Transaction[]
}
export interface LoginSchema {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const DEFAULT_VALUES: LoginSchema = {
  email: "",
  password: "",
  rememberMe: true,
};

export const UserLoggedAtom = atom<UserType | null>({
  key: "UserLoggedAtom",
  default: null,
});

export const FeedbackLoginMessageAtom = atom<FeedbackType>({
  key: "FeedbackLoginMessageAtom",
  default: {
    color: undefined,
    message: null
  }
});