import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { selectIsLogged } from "../../store/user/user.reducer";
import { PostsService } from "../../services/posts/posts.service";
import { DetailsPageComponent } from "./details-page.component";
import userEvent from "@testing-library/user-event/";

const mockPost = {
  projectTitle: "Mock Project",
  backupImage: "url",
  shortDescription: "Mock short description",
  fullDescription: "Mock full description",
  stack: "Mock Stack",
  technologies: ["Mock", "Test", "Fake"],
  yearsOfExperience: "<1 year",
  creator: "Mock Creator",
  createdAt: new Date("2024-05-25"),
  id: "1",
};

const mockUserServiceTrue = {
  getIsLogged: jest.fn().mockReturnValue(of(true)),
  checkUser: jest.fn().mockReturnValue({ username: "Mock Creator" }),
};
const mockUserServiceFalse = {
  getIsLogged: jest.fn().mockReturnValue(of(false)),
  checkUser: jest.fn().mockImplementation(() => {
    throw new Error("Missing token");
  }),
};

describe("Given a DetailsPageComponent", () => {
  const post$ = of(mockPost);
  const mockPostsService = {
    loadPostById: jest.fn(() => of({ post$ })),
    getPostState: jest.fn().mockReturnValue(post$),
    deletePostById: jest.fn(),
  };
  describe("When rendered", () => {
    const renderComponent = async () => {
      await render(DetailsPageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore(),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceTrue },
        ],
      });
    };

    test("Then it should show the post's details", async () => {
      await renderComponent();

      expect(mockPostsService.loadPostById).toHaveBeenCalled();
    });

    test("Then it should show the project name in a heading", async () => {
      const expectedProjectName = mockPost.projectTitle;

      await renderComponent();

      const projectName = screen.getByRole("heading", {
        name: expectedProjectName,
      });

      expect(projectName).toBeInTheDocument();
    });

    test("Then it should show the post's image", async () => {
      const altText = mockPost.projectTitle;

      await renderComponent();

      const image = screen.getByRole("img", { name: altText });

      expect(image).toBeInTheDocument();
    });
  });

  describe("When the user is logged and the post is theirs", () => {
    const renderComponent = async () => {
      await render(DetailsPageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceTrue },
        ],
      });
    };

    test("Then it should show a button to delete the post", async () => {
      const buttonText = /delete post/i;

      await renderComponent();

      const deleteButton = screen.getByRole("button", { name: buttonText });

      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("When the user is logged and the post is not theirs", () => {
    const renderComponent = async () => {
      await render(DetailsPageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceFalse },
        ],
      });
    };

    test("Then it should not show a button to delete the post", async () => {
      const buttonText = /delete post/i;

      await renderComponent();

      const deleteButton = screen.queryByRole("button", { name: buttonText });

      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  describe("When the user clicks on the delete button", () => {
    const renderComponent = async () => {
      await render(DetailsPageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceTrue },
        ],
      });
    };

    test("Then the postsService's deletePostById method should be invoked", async () => {
      const buttonText = /delete post/i;

      await renderComponent();

      const deleteButton = screen.getByRole("button", { name: buttonText });

      await userEvent.click(deleteButton);

      expect(mockPostsService.deletePostById).toHaveBeenCalled();
    });
  });
});
