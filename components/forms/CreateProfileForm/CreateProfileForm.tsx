import React, { FC, useEffect, useState } from "react";
import { isStepRequired } from "../../../helpers/isStepRequired";
import { FormData } from "../../../lib/types";
import { isEmailValid } from "../../../helpers/isEmailValid";
import { getFormDataResult } from "../../../helpers/getFormDataResults";
import { useRouter } from "next/router";
import FormQuestionType from "./FormQuestionType";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import FormError from "./FormError";

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
  const [stepDestination, setStepDestination] = useState("");

  const { steps, logic } = formData.data;
  const step = steps[stepIndex];

  useEffect(() => {
    const checkNextStepLogic = () => {
      for (const rule of logic) {
        const { condition } = rule;
        for (const stepRule of condition) {
          const { fieldId, value, destination } = stepRule;
          const field = formValues.data.steps[stepIndex].fields.find(
            (f) => f.fieldId === fieldId
          );

          if (field && field.value === value) {
            setStepDestination(destination);
            return;
          }
        }
      }

      setStepDestination("");
    };

    checkNextStepLogic();
  }, [formValues, stepIndex, logic]);

  console.log(stepDestination);

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
    const nextStepIndex = stepIndex + 1;

    if (hasValue && isRequired) {
      e.preventDefault();
      setCurrentInput("");
      setStepIndex(nextStepIndex);
    } else if (!isRequired) {
      setStepIndex(nextStepIndex);
    }

    if (stepDestination) {
      const destinationIndex = steps.findIndex(
        (step) => step.stepId === stepDestination
      );
      if (destinationIndex !== -1) {
        setStepIndex(destinationIndex);
      }
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
            {displayError && <FormError />}
          </div>
        </div>
      </div>
      <div>
        {stepIndex > 0 && (
          <button onClick={handlePreviousStep}>
            {step.primaryButtonLabel}
          </button>
        )}
        {stepIndex < formData.data.steps.length - 1 && (
          <button onClick={handleNextStep}>{step.secondaryButtonLabel}</button>
        )}
        {stepIndex === formData.data.steps.length - 1 && (
          <button onClick={handleSubmit}>{step.secondaryButtonLabel}</button>
        )}
      </div>
    </form>
  );
};

export default CreateProfileForm;
