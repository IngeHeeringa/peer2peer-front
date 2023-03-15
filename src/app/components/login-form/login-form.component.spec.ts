import { render, screen, waitFor } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { MatInputModule } from "@angular/material/input";
import "@testing-library/jest-dom";
import { LoginFormComponent } from "./login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Store } from "@ngrx/store";
import { MockUserService } from "../../spec/user.service.mock";
import { createMockStore } from "../../spec/mockStore";
import { type UserCredentials } from "../../store/user/types";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const renderComponent = async () => {
  const store = createMockStore();
  const userService = new MockUserService();
  await render(LoginFormComponent, {
    imports: [
      MatInputModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      MatSnackBarModule,
    ],
    providers: [
      HttpClient,
      { provide: Store, useValue: store },
      { provide: UserService, useValue: userService },
    ],
  });
  return { store, userService };
};

describe("Given a LoginForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a form", async () => {
      await renderComponent();

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    test("Then it should show an input field for an email address", async () => {
      const labelText = "Email";

      await renderComponent();

      const emailInput = screen.getByLabelText(labelText);

      expect(emailInput).toBeInTheDocument();
    });

    test("Then it should show an input field for a password", async () => {
      const labelText = "Password";

      await renderComponent();

      const passwordInput = screen.getByLabelText(labelText);

      expect(passwordInput).toBeInTheDocument();
    });

    test("Then it should show a submit button with the text 'Log in'", async () => {
      const buttonText = "Log in";

      await renderComponent();

      const submitButton = screen.getByRole("button", { name: buttonText });

      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("When the user enters an email with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "mock@user.com");
      await userEvent.tab();

      expect(emailInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user's email address does not have the correct format", () => {
    test("Then it should show the validation error 'Not a valid email'", async () => {
      const expectedErrorMessage = /not a valid email/i;

      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "mock@user");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the email field leaving it empty", () => {
    test("Then it should show the validation error 'You must enter an email address'", async () => {
      const expectedErrorMessage = /you must enter an email address/i;

      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user enters a password", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "password123");
      await userEvent.tab();

      expect(passwordInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user unfocuses the password field leaving it empty", () => {
    test("Then it should show the validation error 'You must enter a password address'", async () => {
      const expectedErrorMessage = /you must enter a password/i;

      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user submits the form with the correct credentials email 'mock@user.com' and password 'safepassword123'", () => {
    test("Then the UserService's getToken method should be invoked with the user's credentials", async () => {
      const userCredentials: UserCredentials = {
        email: "mock@user.com",
        password: "safepassword123",
      };

      const { userService } = await renderComponent();
      const spy = jest.spyOn(userService, "getToken");

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log in" });

      await userEvent.type(emailInput, userCredentials.email);
      await userEvent.type(passwordInput, userCredentials.password);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(userCredentials);
      });
    });
  });
});
