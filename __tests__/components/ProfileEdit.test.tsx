import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileEdit from "../../app/components/ProfileEdit";

const queryClient = new QueryClient();

const mockProfile = {
  id: "1",
  username: "testuser",
  email: "test@example.com",
  phone: "1234567890",
  avatar: "https://example.com/avatar.jpg",
  language: "en",
  theme: "light",
};

const mockUpdateProfile = jest.fn();
jest.mock("../../lib/api", () => ({
  updateProfile: (profile) => mockUpdateProfile(profile),
}));

describe("ProfileEdit", () => {
  it("renders form fields correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileEdit profile={mockProfile} />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText("Username")).toHaveValue(mockProfile.username);
    expect(screen.getByLabelText("Email")).toHaveValue(mockProfile.email);
    expect(screen.getByLabelText("Phone")).toHaveValue(mockProfile.phone);
  });

  it("submits form with updated data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileEdit profile={mockProfile} />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "newusername" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "newusername",
        })
      );
    });
  });
});
