import { render, screen } from "@testing-library/angular";
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
});
