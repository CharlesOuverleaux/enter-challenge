import React, { FC, useEffect, useState } from "react";
import { isStepRequired } from "../../../helpers/isStepRequired";
import { FormData } from "../../../lib/types";
import { isEmailValid } from "../../../helpers/isEmailValid";
import { useRouter } from "next/router";
import FormQuestionType from "./FormQuestionType";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import FormError from "./FormError";
import { getNextStepLogic } from "../../../helpers/getNextStepLogic";
import { getFormResults } from "../../../helpers/getFormResults";
import { getUpdatedSteps } from "../../../helpers/getUpdatedSteps";

interface ProfileFormProps {
  formData: FormData;
}

const ProfileForm: FC<ProfileFormProps> = ({ formData }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formResults, setFormResults] = useState(getFormResults(formData));
  const [currentInput, setCurrentInput] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [nextStepRule, setNextStepRule] = useState("");

  const { steps, logic } = formData;
  const currentStep = steps[stepIndex];
  const currentStepId = formResults.steps[stepIndex].stepId;

  const router = useRouter();

  useEffect(() => {
    const rule = getNextStepLogic(logic, formResults, stepIndex, currentStepId);
    setNextStepRule(rule);
  }, [logic, formResults, currentStepId, stepIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInput(value);
    const updatedSteps = getUpdatedSteps(
      formResults,
      currentStepId,
      name,
      value
    );
    setFormResults({ steps: updatedSteps });
  };

  const handleNextStep = (e: any) => {
    const hasValue = currentInput.length > 0;
    const isRequired = isStepRequired(currentStep);
    const nextStepIndex = stepIndex + 1;

    if (hasValue && isRequired) {
      e.preventDefault();
      setCurrentInput("");
      setStepIndex(nextStepIndex);
    } else if (!isRequired) {
      setStepIndex(nextStepIndex);
    }

    if (nextStepRule) {
      const nextStepRuleIndex = steps.findIndex(
        (step) => step.stepId === nextStepRule
      );
      if (nextStepRuleIndex !== -1) {
        setStepIndex(nextStepRuleIndex);
      }
    }
  };

  const handlePreviousStep = (e: any) => {
    e.preventDefault();
    setStepIndex(stepIndex - 1);
  };

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
          body: JSON.stringify(formResults),
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
      <div key={currentStep.stepId}>
        <FormQuestionType
          type={isStepRequired(currentStep) ? "required" : "optional"}
        />
        <div>
          <FormHeader step={currentStep} stepIndex={stepIndex} />
          <div className="mt-6 space-y-6">
            {currentStep.fields.map((field) => (
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
            {currentStep.primaryButtonLabel}
          </button>
        )}
        {stepIndex < formData.steps.length - 1 && (
          <button onClick={handleNextStep}>
            {currentStep.secondaryButtonLabel}
          </button>
        )}
        {stepIndex === formData.steps.length - 1 && (
          <button onClick={handleSubmit}>
            {currentStep.secondaryButtonLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
