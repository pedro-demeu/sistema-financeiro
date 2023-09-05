import { UserType } from './login';
import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

export const useLogin = () => {

  const listUsers: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');


  function createAccount(newUser: UserType) {
    const transformedData: UserType = {
      email: newUser.email,
      username: newUser.username,
      id: uuid.v4(),
      password: CryptoJS.SHA256(newUser.password).toString(),
      finances: newUser.finances
    };

    const updatedUsers = [...listUsers, transformedData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  function deleteAccount(userID: string) {
    // TODO
  }

  function editAccount(user: UserType) {
    // TODO
  }

  return {
    createAccount,
  };
};