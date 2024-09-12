"use client";

import { createContext, useState } from "react";
import { Toast } from "@/components/Toast";

export interface ToastContext {
  toast: {
    success: boolean;
    message: string;
    isLoading: boolean;
  };
  handleToast: (success: boolean, message: string, slow?: boolean) => void;
}

export const toastContext = createContext<ToastContext | null>(null);

function ToastProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [toast, setToast] = useState({
    success: true,
    message: "",
    isLoading: false,
  });

  const handleToast = (success: boolean, message: string, isSlow?: boolean) => {
    setToast({
      success,
      message,
      isLoading: true,
    });

    setTimeout(
      () => {
        setToast({
          ...toast,
          isLoading: false,
        });
      },
      isSlow ? 3000 : 1000,
    );
  };

  return (
    <toastContext.Provider value={{ toast, handleToast }}>
      {children}
      <Toast
        message={toast.message}
        success={toast.success}
        isLoading={toast.isLoading}
      />
    </toastContext.Provider>
  );
}

export default ToastProvider;
