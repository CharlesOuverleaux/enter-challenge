/**
 * Extracts form field values from the provided formValues object and returns
 * a new object with only the fields that have values. The key for each field
 * will be the label or fieldId.
 *
 * @param formValues - The form values object.
 * @returns An object containing the fields that have values.
 */
export const getFormDataResult = (
  formValues: any
): { [key: string]: string } => {
  const result: { [key: string]: string } = {};

  formValues.data.steps.forEach((step: any) => {
    step.fields.forEach((field: any) => {
      if (field.value) {
        const label = field.label || field.fieldId;
        result[label] = field.value;
      }
    });
  });

  return result;
};
