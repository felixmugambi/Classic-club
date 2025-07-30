// components/LoadingButton.tsx
"use client";

import { ButtonHTMLAttributes } from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function LoadingButton({ loading, children, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`w-full py-2 rounded font-semibold transition flex items-center justify-center gap-2
        ${loading || disabled ? "bg-gray-400 cursor-not-allowed" : "bg-clubRed hover:bg-red-600"}
        text-white`}
    >
      {loading && <ImSpinner2 className="animate-spin text-lg" />}
      {children}
    </button>
  );
}
