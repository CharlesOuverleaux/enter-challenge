import clsx from "clsx";
import React, { FC } from "react";

interface FormQuestionTypeProps {
  type: "required" | "optional";
}

const FormQuestionType: FC<FormQuestionTypeProps> = ({ type }) => {
  return (
    <div
      className={clsx(
        "rounded-lg w-24",
        type === "required" ? "bg-tertiary-light" : "bg-secondary-light"
      )}
    >
      <p
        className={clsx(
          "capitalize p-1",
          type === "required"
            ? "text-tertiary-standard"
            : "text-secondary-standard"
        )}
      >
        {type}
      </p>
    </div>
  );
};

export default FormQuestionType;
