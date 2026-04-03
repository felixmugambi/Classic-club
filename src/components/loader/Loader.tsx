'use client';

type LoaderProps = {
  open: boolean;
  text?: string;
};

export default function Loader({ open, text = "Loading..." }: LoaderProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg px-8 py-6">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-200 font-medium">{text}</p>
      </div>
    </div>
  );
}
