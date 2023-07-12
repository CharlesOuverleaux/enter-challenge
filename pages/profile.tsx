import type { NextPage } from "next";
import UserProfile from "../components/data-display/UserProfile/UserProfile";
import userData from "../data/userData.json";

const Profile: NextPage = () => {
  return <UserProfile userData={userData} />;
};

export default Profile;
