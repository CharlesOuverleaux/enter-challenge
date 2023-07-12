import React, { FC } from "react";
import { FormStep } from "../../../lib/types";

interface FormHeaderProps {
  step: FormStep;
  stepIndex: number;
}

const FormHeader: FC<FormHeaderProps> = ({ step, stepIndex }) => {
  return (
    <div>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Question {stepIndex + 1} {step.title}
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">{step.description}</p>
    </div>
  );
};

export default FormHeader;
