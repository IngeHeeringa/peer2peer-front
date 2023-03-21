import { render, screen } from "@testing-library/angular";
import { PostComponent } from "./post.component";
import "@testing-library/jest-dom";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PostsService } from "../../services/posts/posts.service";
import userEvent from "@testing-library/user-event/";
import { selectIsLogged } from "../../store/user/user.reducer";
import { UserService } from "../../services/user/user.service";
import { of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { TokenService } from "../../services/token/token.service";
import { createMock } from "@testing-library/angular/jest-utils";

describe("Given a Post component", () => {
  const post = {
    backupImage: "testUrl",
    projectTitle: "testProjectTitle",
    shortDescription: "testShortDescription",
    fullDescription: "testFullDescription",
    stack: "testStack",
    technologies: ["testTechnology", "testTechnology2"],
    yearsOfExperience: "testExperience",
    creator: "Mock Creator",
    createdAt: new Date("2024-05-25"),
    id: "1",
  };

  const mockPostsService = createMock(PostsService);
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
  const mockTokenServiceTrue = {
    fetchToken: jest
      .fn()
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA3MTRhZDM5MzE2MjBhYWI4NTI4N2MiLCJlbWFpbCI6Im1vY2tAdXNlci5jb20iLCJ1c2VybmFtZSI6Ik1vY2sgQ3JlYXRvciIsImlhdCI6MTY3OTEzNjkwMSwiZXhwIjoxNjc5MjIzMzAxfQ.346MS01N4mT-ax0jBg9ehIHbij-IbO1mLThSQ-KqYzk"
      ),
  };
  const mockTokenServiceFalse = {
    fetchToken: jest.fn().mockRejectedValue(undefined),
  };

  const renderComponent = async () => {
    await render(PostComponent, {
      imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectIsLogged, value: false }],
        }),
        { provide: PostsService, useValue: mockPostsService },
        { provide: UserService, useValue: mockUserServiceTrue },
        { provide: TokenService, useValue: mockTokenServiceTrue },
      ],
      componentProperties: { post },
    });
  };

  describe("When rendered", () => {
    test("Then it should show an article with all the post data in it", async () => {
      await renderComponent();

      const post = screen.getByRole("article");

      expect(post).toBeInTheDocument();
    });

    test("Then it should show an image with the project title as alt text", async () => {
      const altText = post.projectTitle;

      await renderComponent();

      const image = screen.getByRole("img", { name: altText });

      expect(image).toBeInTheDocument();
      expect(image).toHaveAccessibleName(altText);
    });

    test("Then it should show the project title in a heading", async () => {
      const title = post.projectTitle;

      await renderComponent();

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button to view the post's details", async () => {
      const detailsButtonText = /details/i;

      await renderComponent();

      const detailsButton = screen.getByRole("link", {
        name: detailsButtonText,
      });

      expect(detailsButton).toBeInTheDocument();
    });
  });

  describe("When the user is logged and the post is theirs", () => {
    test("Then it should show a button to delete the post", async () => {
      const ariaLabel = /delete icon/i;

      await render(PostComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceTrue },
          { provide: TokenService, useValue: mockTokenServiceTrue },
        ],
        componentProperties: { post },
      });

      const deleteButton = screen.getByRole("button", { name: ariaLabel });

      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("When the user is logged and the post is not theirs", () => {
    test("Then it should not show a button to delete the post", async () => {
      const ariaLabel = /delete icon/i;

      await render(PostComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceFalse },
          { provide: TokenService, useValue: mockTokenServiceFalse },
        ],
        componentProperties: { post },
      });

      const deleteButton = screen.queryByRole("button", { name: ariaLabel });

      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  describe("When the user clicks on the delete button", () => {
    test("Then the postsService's deletePostById method should be invoked", async () => {
      const ariaLabel = /delete icon/i;

      await render(PostComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
          { provide: PostsService, useValue: mockPostsService },
          { provide: UserService, useValue: mockUserServiceTrue },
          { provide: TokenService, useValue: mockTokenServiceTrue },
        ],
        componentProperties: { post },
      });

      const deleteButton = screen.getByRole("button", { name: ariaLabel });

      await userEvent.click(deleteButton);

      expect(mockPostsService.deletePostById).toHaveBeenCalled();
    });
  });
});
