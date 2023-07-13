import { queryByText, render, screen } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import FormData from "../../../../data/formData.json";

describe("ProfileForm component", () => {
  it("should render with the correct question type", async () => {
    // given
    const { findByText } = render(<ProfileForm formData={FormData.data} />);
    // when
    const formType = await findByText("required");
    const previousBtnLabel = await screen.queryByText("Previous step");
    const nextBtnLabel = await findByText("Next step");
    // then
    expect(formType).toBeVisible();
    expect(previousBtnLabel).toBeNull();
    expect(nextBtnLabel).toBeVisible();
  });
});
