import clsx from "clsx";
import React, { FC } from "react";

interface ButtonProps {
  ctaText: string;
  onClick: (e: any) => void;
  style: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ ctaText, onClick, style = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-4 rounded-2xl shadow-md opacity-90 hover:opacity-100 font-bold",
        style === "primary"
          ? "bg-primary-standard text-base-100"
          : "bg-secondary-standard text-base-10"
      )}
    >
      {ctaText}
    </button>
  );
};

export default Button;
