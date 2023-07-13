import { FormLogic, FormData } from "../lib/types";

export const getNextStepLogic = (
  logic: FormLogic[],
  formResults: any,
  stepIndex: number,
  currentStepId: string
) => {
  for (const rule of logic) {
    if (rule.target === currentStepId) {
      for (const condition of rule.condition) {
        const { fieldId, value, destination } = condition;
        const field = formResults.steps[stepIndex].fields.find(
          (field: any) => field.fieldId === fieldId
        );

        if (field && field.userInput === value) {
          return destination;
        }
      }
    }
  }

  return "";
};
