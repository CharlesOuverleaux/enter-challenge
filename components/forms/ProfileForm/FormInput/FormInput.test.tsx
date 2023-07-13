import { render } from "@testing-library/react";
import FormInput from "./FormInput";
import { ChangeEvent } from "react";

const field = {
  fieldId: "field_01",
  fieldLabel: "userType",
  userInput: "",
  type: "radio",
  properties: [
    {
      id: "radio_01",
      placeholder: "",
      label: "Test",
      description: "",
      value: "test",
    },
    {
      id: "radio_02",
      placeholder: "",
      label: "Test2",
      description: "",
      value: "test2",
    },
  ],
  validation: {
    required: true,
  },
};

describe("FormInput component", () => {
  it("should render with header content", async () => {
    // given
    const { findByText } = render(
      <FormInput
        field={field}
        handleInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    // when
    const firstLabel = await findByText("Test");
    const secondLabel = await findByText("Test2");
    // then
    expect(firstLabel).toBeVisible();
    expect(secondLabel).toBeVisible();
  });
});
