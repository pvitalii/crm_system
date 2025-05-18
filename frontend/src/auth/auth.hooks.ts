import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from './auth.service';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      window.location.href = '/'
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      window.location.href = '/'
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login'
    },
  });
};