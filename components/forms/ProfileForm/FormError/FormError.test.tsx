import { render } from "@testing-library/react";
import FormError from "./FormError";

describe("FormError component", () => {
  it("should render with error content", async () => {
    // given
    const { findByText } = render(<FormError />);
    // when
    const errorContent = await findByText("Please input a valid email format");
    // then
    expect(errorContent).toBeVisible();
  });
});
