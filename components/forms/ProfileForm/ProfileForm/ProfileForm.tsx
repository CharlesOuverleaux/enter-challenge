import { FC, useEffect, useState } from "react";
import { FormData } from "../../../../lib/types";
import { useRouter } from "next/router";
import FormQuestionType from "../FormQuestionType/FormQuestionType";
import FormHeader from "../FormHeader/FormHeader";
import FormInput from "../FormInput/FormInput";
import FormError from "../FormError/FormError";
import Button from "../../../actions/Button/Button";
import { isStepRequired } from "../../../../helpers/isStepRequired";
import { isEmailValid } from "../../../../helpers/isEmailValid";
import { getNextStepLogic } from "../../../../helpers/getNextStepLogic";
import { getFormResults } from "../../../../helpers/getFormResults";
import { getUpdatedSteps } from "../../../../helpers/getUpdatedSteps";
import clsx from "clsx";

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
    <form
      onSubmit={handleSubmit}
      className="border p-4 bg-white rounded-2xl shadow-lg w-[512px]"
    >
      <div key={currentStep.stepId}>
        <FormQuestionType
          type={isStepRequired(currentStep) ? "required" : "optional"}
        />
        <div>
          <FormHeader step={currentStep} stepIndex={stepIndex} />
          <div className="mt-6 relative">
            {currentStep.fields.map((field) => (
              <FormInput
                key={field.fieldId}
                field={field}
                handleInputChange={handleInputChange}
              />
            ))}
            {displayError && (
              <div className="absolute top-0">
                <FormError />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex",
          stepIndex > 0 ? "justify-between" : "justify-end"
        )}
      >
        {stepIndex > 0 && (
          <Button
            ctaText={currentStep.primaryButtonLabel}
            onClick={handlePreviousStep}
            style="primary"
          />
        )}
        {stepIndex < formData.steps.length - 1 && (
          <Button
            ctaText={currentStep.secondaryButtonLabel}
            onClick={handleNextStep}
            style="secondary"
          />
        )}
        {stepIndex === formData.steps.length - 1 && (
          <Button
            ctaText={currentStep.secondaryButtonLabel}
            onClick={handleSubmit}
            style="secondary"
          />
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
