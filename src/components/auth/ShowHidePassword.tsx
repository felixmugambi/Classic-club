"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowHidePassword = ({ placeholder, name }: { placeholder: string; name: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-sm rounded bg-[#222] text-white focus:outline-none"
      />
      <span
        className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default ShowHidePassword;
