import React, { FC, useState } from "react";
import { isStepRequired } from "../../../helpers/isStepRequired";
import { FormData, TypeFormField } from "../../../lib/types";
import { isEmailValid } from "../../../helpers/isEmailValid";
import { getFormDataResult } from "../../../helpers/getFormDataResults";
import { useRouter } from "next/router";
import FormQuestionType from "./FormQuestionType";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";

interface CreateProfileFormProps {
  formData: FormData;
}

const CreateProfileForm: FC<CreateProfileFormProps> = ({ formData }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    data: {
      steps: formData.data.steps.map((step) => {
        return {
          stepId: step.stepId,
          fields: step.fields.map((field) => {
            return {
              label: field.properties[0].label,
              fieldId: field.fieldId,
              value: "",
            };
          }),
        };
      }),
    },
  });

  const [currentInput, setCurrentInput] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const { steps } = formData.data;
  const step = steps[stepIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInput(value);
    setFormValues({
      ...formValues,
      data: {
        ...formValues.data,
        steps: formValues.data.steps.map((step) => {
          return {
            ...step,
            fields: step.fields.map((field) => {
              if (field.fieldId === name) {
                return {
                  ...field,
                  value,
                };
              }
              return field;
            }),
          };
        }),
      },
    });
  };

  const handleNextStep = (e: any) => {
    const hasValue = currentInput.length > 0;
    const isRequired = isStepRequired(step);

    if (hasValue && isRequired) {
      e.preventDefault();
      setCurrentInput("");
      setStepIndex(stepIndex + 1);
    } else if (!isRequired) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePreviousStep = (e: any) => {
    e.preventDefault();
    setStepIndex(stepIndex - 1);
  };

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isCurrentEmailValid = isEmailValid(currentInput);

    if (isCurrentEmailValid) {
      setDisplayError(false);
      try {
        const response = await fetch("/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getFormDataResult(formValues)),
        });

        if (response.ok) {
          setCurrentInput("");
          setStepIndex(0);
          router.push("/profile");
        } else {
          console.error("Failed to save data");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    } else {
      setDisplayError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div key={step.stepId}>
        <FormQuestionType
          type={isStepRequired(step) ? "required" : "optional"}
        />
        <div>
          <FormHeader step={step} stepIndex={stepIndex} />
          <div className="mt-6 space-y-6">
            {step.fields.map((field) => (
              <FormInput
                key={field.fieldId}
                field={field}
                handleInputChange={handleInputChange}
              />
            ))}
            {displayError && (
              <p className="text-red-500">Please input a valid email format</p>
            )}
          </div>
        </div>
      </div>
      <div>
        {stepIndex > 0 && (
          <button onClick={handlePreviousStep}>
            {step.secondaryButtonLabel}
          </button>
        )}
        {stepIndex < formData.data.steps.length - 1 && (
          <button onClick={handleNextStep}>{step.primaryButtonLabel}</button>
        )}
        {stepIndex === formData.data.steps.length - 1 && (
          <button onClick={handleSubmit}>{step.primaryButtonLabel}</button>
        )}
      </div>
    </form>
  );
};

export default CreateProfileForm;
