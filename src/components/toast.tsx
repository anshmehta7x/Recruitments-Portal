import { toast } from "react-toastify";
import { ToastOptions, Bounce } from "react-toastify";

interface SuccessToastProps {
  message: string;
}

export default function SuccessToast(
  { message }: SuccessToastProps,
  options?: ToastOptions
) {
  const defaultOptions: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  toast.success(message, { ...defaultOptions, ...options });
  return null;
}

export function ErrorToast(
  { message }: SuccessToastProps,
  options?: ToastOptions
) {
  const defaultOptions: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  toast.error(message, { ...defaultOptions, ...options });
  return null;
}
