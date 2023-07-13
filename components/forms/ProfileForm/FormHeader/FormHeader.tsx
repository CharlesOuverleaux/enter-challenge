import React, { FC } from "react";
import { FormStep } from "../../../../lib/types";

interface FormHeaderProps {
  step: FormStep;
  stepIndex: number;
}

const FormHeader: FC<FormHeaderProps> = ({ step, stepIndex }) => {
  return (
    <div className="py-2 text-left">
      <legend className="text-2xl font-bold leading-6 text-base-100">
        Question {stepIndex + 1} {step.title}
      </legend>
      <p className="mt-2 text-sm leading-6 text-base-60">{step.description}</p>
    </div>
  );
};

export default FormHeader;
