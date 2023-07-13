import React, { FC } from "react";
import UserData from "../../../data/userData.json";

const UserProfile: FC = () => {
  return (
    <div className="text-center">
      {UserData.steps.map((step) => (
        <ul key={step.stepId}>
          {step.fields.map((field) => {
            if (field.userInput !== "") {
              return (
                <li key={field.fieldId}>
                  <span>{field.fieldTitle}: </span>
                  <span>{field.userInput}</span>
                </li>
              );
            }
            return null;
          })}
        </ul>
      ))}
    </div>
  );
};

export default UserProfile;
