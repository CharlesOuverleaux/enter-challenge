import React, { FC } from "react";

interface FormQuestionTypeProps {
  type: "required" | "optional";
}

const FormQuestionType: FC<FormQuestionTypeProps> = ({ type }) => {
  return (
    <div>
      <p>{type}</p>
    </div>
  );
};

export default FormQuestionType;
