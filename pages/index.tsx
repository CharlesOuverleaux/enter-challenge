import type { NextPage } from "next";
import Head from "next/head";
import CreateProfileForm from "../components/forms/CreateProfileForm/CreateProfileForm";
import formData from "../data/formData.json";

const Home: NextPage = () => {
  const { steps } = formData.data;

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
          <CreateProfileForm />
          <ul>
            {steps.map((step) => (
              <li key={step.stepId}>{step.title}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
