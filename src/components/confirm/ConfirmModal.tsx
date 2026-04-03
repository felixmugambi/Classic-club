"use client";

import { ReactNode } from "react";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="t bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {description}
        </h3>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
