import React, { FC } from "react";
import UserData from "../../../data/userData.json";

const UserProfile: FC = () => {
  return (
    <div>
      <ul>
        {Object.entries(UserData).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
