import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

const SocialAuthButtons = () => {
  return (
    <div className="space-y-2">
      <button className="flex items-center justify-center gap-2 w-full py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition">
        <FaGoogle /> Sign up with Google
      </button>
      <button className="flex items-center justify-center gap-2 w-full py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition">
        <FaFacebookF /> Sign up with Facebook
      </button>
      <button className="flex items-center justify-center gap-2 w-full py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition">
        <FaApple /> Sign up with Apple
      </button>
    </div>
  );
};

export default SocialAuthButtons;
