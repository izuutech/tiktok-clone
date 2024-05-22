import {
  useToast as useToastHook,
  ToastType,
} from 'react-native-toast-notifications';

const useToast: () => ToastType = () => {
  const toast: ToastType = useToastHook();
  return toast;
};

export default useToast;
