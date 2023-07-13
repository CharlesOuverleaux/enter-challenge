import { render } from "@testing-library/react";
import FormHeader from "./FormHeader";

const step = {
  stepId: "step_01",
  title: "Your type of creature",
  description: "Please select your type of creature.",
  fields: [
    {
      fieldId: "field_01",
      fieldLabel: "userType",
      userInput: "",
      type: "radio",
      properties: [
        {
          id: "radio_01",
          placeholder: "",
          label: "Human",
          description: "",
          value: "human",
        },
        {
          id: "radio_02",
          placeholder: "",
          label: "Robot",
          description: "",
          value: "robot",
        },
      ],
      validation: {
        required: true,
      },
    },
  ],
  primaryButtonLabel: "",
  secondaryButtonLabel: "Next step",
};

describe("FormHeader component", () => {
  it("should render with header content", async () => {
    // given
    const { findByText } = render(<FormHeader step={step} stepIndex={1} />);
    // when
    const title = await findByText("Question 2 Your type of creature");
    const description = await findByText(
      "Please select your type of creature."
    );
    // then
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  });
});
