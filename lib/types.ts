export type FormData = {
  version: string;
  data: {
    steps: FormStep[];
    logic: FormLogic[];
  };
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

export enum TypeFormField {
  Radio = "radio",
  Input = "input",
}
