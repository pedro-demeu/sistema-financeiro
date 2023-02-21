import { boolean, object, string } from 'yup';

export const loginValidations = object({
    username: string().required().min(4).max(50),
    password: string().required().min(4).max(8),
    rememberMe: boolean()
  })
