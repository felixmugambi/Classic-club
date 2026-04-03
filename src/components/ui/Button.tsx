type ButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  fullWidth?: boolean;
};

const Button = ({ children, variant = "solid", fullWidth = false }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        variant === "solid"
          ? "bg-red-700 text-white hover:bg-red-600"
          : "bg-transparent text-black hover:bg-gray-200"
      } ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
