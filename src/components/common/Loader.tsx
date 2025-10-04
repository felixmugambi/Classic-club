import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <FaSpinner className="text-clubRed animate-spin text-4xl" />
    </div>
  );
}
