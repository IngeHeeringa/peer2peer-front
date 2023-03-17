import {
  fireEvent,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/angular";
import userEvent from "@testing-library/user-event/";
import { PostFormComponent } from "./post-form.component";
import "@testing-library/jest-dom";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";

const renderComponent = async () => {
  await render(PostFormComponent, {
    imports: [
      MatInputModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatSelectModule,
      NgxMatFileInputModule,
      MatRadioModule,
    ],
  });
};

describe("Given a PostForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a form to submit a post", async () => {
      await renderComponent();

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    test("Then it should show an input field for the project name", async () => {
      const projectNameLabel = /project name/i;

      await renderComponent();

      const projectNameInput = screen.getByLabelText(projectNameLabel);

      expect(projectNameInput).toBeInTheDocument();
    });

    test("Then it should show input fields for a short description and a full description of the coding challenge", async () => {
      const shortDescriptionLabel = /i want to build.../i;
      const fullDescriptionLabel = /describe your challenge/i;

      await renderComponent();

      const shortDescriptionInput = screen.getByLabelText(
        shortDescriptionLabel
      );
      const fullDescriptionInput = screen.getByLabelText(fullDescriptionLabel);

      expect(shortDescriptionInput).toBeInTheDocument();
      expect(fullDescriptionInput).toBeInTheDocument();
    });

    test("Then it should show a select input for the project's stack", async () => {
      const stackLabel = /stack/i;

      await renderComponent();

      const stackInput = screen.getByLabelText(stackLabel);

      expect(stackInput).toBeInTheDocument();
    });

    test("Then it should show a multiselect input for the project's technologies", async () => {
      const technologiesLabel = /technologies/i;

      await renderComponent();

      const technologiesInput = screen.getByLabelText(technologiesLabel);

      expect(technologiesInput).toBeInTheDocument();
    });

    test("Then it should show a radio group input for the user's programming experience", async () => {
      const experienceLabel = /experience/i;

      await renderComponent();

      const experienceInput = screen.getByLabelText(experienceLabel);

      expect(experienceInput).toBeInTheDocument();
    });

    test("Then the first option '<1 year' of the experience options should be checked", async () => {
      await renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("radio", { name: "<1 year" })).toBeChecked();
      });
    });

    test("Then it should show a file input for an image", async () => {
      const imageLabel = /image/i;

      await renderComponent();

      const imageInput = screen.getByLabelText(imageLabel);

      expect(imageInput).toBeInTheDocument();
    });

    test("Then it should show a button to submit the post", async () => {
      const submitButtonText = /submit post/i;

      await renderComponent();

      const submitButton = screen.getByRole("button", {
        name: submitButtonText,
      });

      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("When the user enters a project name with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const projectNameInput = screen.getByLabelText("Project name");

      await userEvent.click(projectNameInput);
      await userEvent.type(projectNameInput, "Mock project");
      await userEvent.tab();

      expect(projectNameInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user enters a project name longer than 15 characters", () => {
    test("Then it should show the validation error 'Maximum length is 15 characters'", async () => {
      const expectedErrorMessage = /maximum length is 15 characters/i;

      await renderComponent();

      const projectNameInput = screen.getByLabelText("Project name");

      await userEvent.click(projectNameInput);
      await userEvent.type(projectNameInput, "This project title is too long");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the project name field leaving it empty", () => {
    test("Then it should show the validation error 'Project name is required'", async () => {
      const expectedErrorMessage = /project name is required/i;

      await renderComponent();

      const projectNameInput = screen.getByLabelText("Project name");

      await userEvent.click(projectNameInput);
      await userEvent.type(projectNameInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user enters a short description with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const shortDescriptionInput = screen.getByLabelText("I want to build...");

      await userEvent.click(shortDescriptionInput);
      await userEvent.type(shortDescriptionInput, "Reactive form");
      await userEvent.tab();

      expect(shortDescriptionInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user enters a short description longer than 20 characters", () => {
    test("Then it should show the validation error 'Maximum length is 20 characters'", async () => {
      const expectedErrorMessage = /maximum length is 20 characters/i;

      await renderComponent();

      const shortDescriptionInput = screen.getByLabelText("I want to build...");

      await userEvent.click(shortDescriptionInput);
      await userEvent.type(
        shortDescriptionInput,
        "This short description is too long"
      );
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the short description field leaving it empty", () => {
    test("Then it should show the validation error 'Project name is required'", async () => {
      const expectedErrorMessage = /project name is required/i;

      await renderComponent();

      const projectNameInput = screen.getByLabelText("Project name");

      await userEvent.click(projectNameInput);
      await userEvent.type(projectNameInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user enters a full description with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const fullDescriptionInput = screen.getByLabelText(
        "Describe your challenge"
      );

      await userEvent.click(fullDescriptionInput);
      await userEvent.type(
        fullDescriptionInput,
        "Hello, I am building an app and testing it with Angular Testing Library"
      );
      await userEvent.tab();

      expect(fullDescriptionInput.getAttribute("aria-invalid")).toBe("false");
    });
  });
});
