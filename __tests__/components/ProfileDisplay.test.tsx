import { render, screen } from "@testing-library/react";
import ProfileDisplay from "../../app/components/ProfileDisplay";

const mockProfile = {
  id: "1",
  username: "testuser",
  email: "test@example.com",
  phone: "1234567890",
  avatar: "https://example.com/avatar.jpg",
  language: "en",
  theme: "light",
};

describe("ProfileDisplay", () => {
  it("renders profile information correctly", () => {
    render(<ProfileDisplay profile={mockProfile} />);

    expect(screen.getByText(mockProfile.username)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockProfile.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Phone: ${mockProfile.phone}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProfile.username)).toHaveAttribute(
      "src",
      mockProfile.avatar
    );
  });
});
