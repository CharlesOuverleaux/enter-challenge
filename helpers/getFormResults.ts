import { FormData } from "../lib/types";

export const getFormResults = (formData: FormData) => {
  return {
    steps: formData.steps.map((step) => {
      const fields = step.fields.map((field) => ({
        fieldId: field.fieldId,
        fieldTitle: field.fieldLabel,
        userInput: field.userInput || "",
      }));

      return {
        stepId: step.stepId,
        fields,
      };
    }),
  };
};
