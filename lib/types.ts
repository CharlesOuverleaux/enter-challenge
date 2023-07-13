export type ProfileForm = {
  version: string;
  data: FormData;
};

export type FormData = {
  steps: FormStep[];
  logic: FormLogic[];
};

export type FormStep = {
  stepId: string;
  title: string;
  description: string;
  fields: FormField[];
  secondaryButtonLabel: string;
  primaryButtonLabel: string;
};

export type FormLogic = {
  target: string;
  condition: FormCondition[];
};

export type FormCondition = {
  fieldId: string;
  value: string;
  destination: string;
};

export type FormField = {
  fieldId: string;
  fieldLabel: string;
  userInput: string;
  type: string;
  properties: FormFieldProperty[];
  validation: FormFieldValidation;
};

export type FormFieldProperty = {
  id: string;
  placeholder: string;
  label: string;
  description: string;
  value: string;
};

export type FormFieldValidation = {
  required: boolean;
  string?: string;
};

export type TypeFormField = "radio" | "input" | "email";

export type FormResults = {
  steps: {
    stepId: string;
    fields: {
      fieldId: string;
      fieldTitle: string;
      userInput: string;
    }[];
  }[];
};
