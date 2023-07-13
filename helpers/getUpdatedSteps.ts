import { FormResults } from "../lib/types";

export const getUpdatedSteps = (
  formResults: FormResults,
  currentStepId: string,
  name: string,
  value: string
) => {
  return formResults.steps.map((step) => {
    if (step.stepId === currentStepId) {
      const updatedFields = step.fields.map((field) => {
        if (field.fieldId === name) {
          return {
            ...field,
            userInput: value,
          };
        }
        return field;
      });

      return {
        ...step,
        fields: updatedFields,
      };
    }
    return step;
  });
};
