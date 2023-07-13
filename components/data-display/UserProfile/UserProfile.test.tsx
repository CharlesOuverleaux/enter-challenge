import { render } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile component", () => {
  it("should render with error content", async () => {
    // given
    const { findByText } = render(<UserProfile />);
    // when
    const header = await findByText("User profile");
    // then
    expect(header).toBeVisible();
  });
});
