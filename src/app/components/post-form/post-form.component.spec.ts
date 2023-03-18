import { render, screen, waitFor } from "@testing-library/angular";
import userEvent from "@testing-library/user-event/";
import { PostFormComponent } from "./post-form.component";
import "@testing-library/jest-dom";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { createMockStore } from "../../spec/mockStore";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostsService } from "../../services/posts/posts.service";
import { TokenService } from "../../services/token/token.service";
import { of } from "rxjs";

const renderComponent = async () => {
  const store = createMockStore();
  const mockPostsService = {
    submitPost: jest.fn().mockReturnValue(of("true")),
  };
  const mockTokenService = {
    fetchToken: jest
      .fn()
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA3MTRhZDM5MzE2MjBhYWI4NTI4N2MiLCJlbWFpbCI6Im1vY2tAdXNlci5jb20iLCJ1c2VybmFtZSI6Ik1vY2tVc2VyIiwiaWF0IjoxNjc5MTM2OTAxLCJleHAiOjE2NzkyMjMzMDF9.oTmorlHQdQA2nVGcWRYHpuLU2Bb7f_Frjimb9NaACNg"
      ),
  };
  await render(PostFormComponent, {
    imports: [
      MatInputModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatSelectModule,
      NgxMatFileInputModule,
      MatRadioModule,
      HttpClientTestingModule,
    ],
    providers: [
      HttpClient,
      { provide: Store, useValue: store },
      { provide: PostsService, useValue: mockPostsService },
      { provide: TokenService, useValue: mockTokenService },
    ],
  });

  return { mockPostsService };
};

const selectOption = async (element: HTMLElement, option: string) => {
  await userEvent.click(element);
  await userEvent.click(screen.getByRole("option", { name: option }));
};

const selectOptions = async (element: HTMLElement, options: string[]) => {
  await userEvent.click(element);

  for (const option of options) {
    const optionElement = screen.getByRole("option", { name: option });
    // eslint-disable-next-line no-await-in-loop
    await userEvent.click(optionElement);
  }

  await userEvent.click(document.body);
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

  describe("When the user enters a project name longer than 25 characters", () => {
    test("Then it should show the validation error 'Project name is too long'", async () => {
      const expectedErrorMessage = /project name is too long/i;

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

  describe("When the user enters a short description longer than 30 characters", () => {
    test("Then it should show the validation error 'Description is too long'", async () => {
      const expectedErrorMessage = /description is too long/i;

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
    test("Then it should show the validation error 'Description is required is required'", async () => {
      const expectedErrorMessage = /description is required/i;

      await renderComponent();

      const shortDescriptionInput = screen.getByLabelText("I want to build...");

      await userEvent.click(shortDescriptionInput);
      await userEvent.type(shortDescriptionInput, "{enter}");
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

  describe("When the user submits the form with valid form data", () => {
    test("Then the PostsService's 'submitPost' method should be invoked", async () => {
      const { mockPostsService } = await renderComponent();
      const spy = jest.spyOn(mockPostsService, "submitPost");

      const projectNameInput = screen.getByLabelText(/project name/i);
      const shortDescriptionInput =
        screen.getByLabelText(/i want to build.../i);
      const fullDescriptionInput = screen.getByLabelText(
        /describe your challenge/i
      );
      const stackInput = screen.getByLabelText(/stack/i);
      const technologiesInput = screen.getByLabelText(/technologies/i);
      const experienceInput = screen.getByRole("radio", { name: "<1 year" });
      const submitButton = screen.getByRole("button", { name: "Submit post" });
      await userEvent.type(projectNameInput, "My project");
      await userEvent.type(shortDescriptionInput, "Integration test");
      await userEvent.type(
        fullDescriptionInput,
        "Testing, testing, testing..."
      );
      await selectOption(stackInput, "Full Stack");
      await selectOptions(technologiesInput, ["HTML", "CSS"]);
      await userEvent.click(experienceInput);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
