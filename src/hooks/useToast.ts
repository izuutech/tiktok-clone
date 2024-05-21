import {View, Text} from 'react-native';
import React from 'react';
import {
  useToast as useToastHook,
  ToastType,
} from 'react-native-toast-notifications';

const useToast: () => ToastType = () => {
  const toast: ToastType = useToastHook();
  return toast;
};

export default useToast;
