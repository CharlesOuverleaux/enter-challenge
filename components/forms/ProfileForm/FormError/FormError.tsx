import React, { FC } from "react";

const FormError: FC = () => {
  return (
    <p className="text-red-500 text-xs text-left">
      Please input a valid email format
    </p>
  );
};

export default FormError;
