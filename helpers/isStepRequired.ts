/**
 * Checks if a step is required based on the validation rules of its fields.
 * @param step - The step object containing fields and their validation rules.
 * @returns A boolean value indicating if the step is required.
 */

export const isStepRequired = (step: any): boolean => {
  let isRequired = false;

  for (const field of step.fields) {
    if (field.validation && field.validation.required) {
      isRequired = true;
      break;
    }
  }

  return isRequired;
};
