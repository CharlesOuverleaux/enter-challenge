import React, { FC } from "react";
import { FormField, TypeFormField } from "../../../lib/types";

interface FormInputProps {
  field: FormField;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({ field, handleInputChange }) => {
  return (
    <>
      <fieldset key={field.fieldId}>
        {(field.type as TypeFormField) === "radio" ? (
          <div className="flex justify-center gap-4">
            {field.properties.map((property) => (
              <div key={property.id} className="flex items-center gap-x-3">
                <input
                  type="radio"
                  id={property.id}
                  name={field.fieldId}
                  value={property.value}
                  required={field.validation?.required}
                  onChange={handleInputChange}
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
        ) : (
          <div className="flex justify-center gap-4">
            {field.properties.map((property) => (
              <div key={property.id} className="flex items-center gap-x-3">
                <label
                  htmlFor={property.id}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {property.label}
                </label>
                <div className="mt-2">
                  <input
                    type={field.type}
                    name={field.fieldId}
                    id={property.id}
                    required={field.validation?.required}
                    placeholder={property.placeholder}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default FormInput;
