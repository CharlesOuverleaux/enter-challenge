import type { NextPage } from "next";
import Head from "next/head";
import ProfileForm from "../components/forms/ProfileForm/ProfileForm/ProfileForm";
import formData from "../data/formData.json";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Enter Coding Challenge</title>
        <meta name="description" content="Enter Coding Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="text-center">
          <h1 className="text-2xl">Enter Coding Challenge</h1>
          <ProfileForm formData={formData.data} />
        </div>
      </main>
    </div>
  );
};

export default Home;
