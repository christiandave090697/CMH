import {LOGIN, REGISTER} from './types';

export const login = (data) => ({
  type: LOGIN,
  data: data,
});

export const register = (data) => ({
  type: REGISTER,
  data: data,
});
