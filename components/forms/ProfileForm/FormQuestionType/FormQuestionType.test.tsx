import { render } from "@testing-library/react";
import FormQuestionType from "./FormQuestionType";

describe("FormQuestionType component", () => {
  it("should render with the correct question type", async () => {
    // given
    const { findByText } = render(<FormQuestionType type={"required"} />);
    // when
    const type = await findByText("required");
    // then
    expect(type).toBeVisible();
  });
});
