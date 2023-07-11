import React, { FC } from "react";
import { isStepRequired } from "../../../helpers/isStepRequired";
import { FormData, TypeFormField } from "../../../lib/types";

interface CreateProfileFormProps {
  formData: FormData;
}

const CreateProfileForm: FC<CreateProfileFormProps> = ({ formData }) => {
  const { steps } = formData.data;
  const step = steps[1];
  return (
    <form>
      <div key={step.stepId}>
        <p>{isStepRequired(step) ? "Required" : "Optional"}</p>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Question 1 {step.title}
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {step.description}
          </p>
          <div className="mt-6 space-y-6">
            {step.fields.map((field) => (
              <div key={field.fieldId}>
                {(field.type as TypeFormField) === "radio" && (
                  <div className="flex justify-center gap-4">
                    {field.properties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-x-3"
                      >
                        <input
                          type="radio"
                          id={property.id}
                          name={field.fieldId}
                          value={property.value}
                          required={field.validation?.required}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor={property.id}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {property.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {(field.type as TypeFormField) === "input" && (
                  <div className="flex justify-center gap-4">
                    {field.properties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-x-3"
                      >
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {property.label}
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default CreateProfileForm;
