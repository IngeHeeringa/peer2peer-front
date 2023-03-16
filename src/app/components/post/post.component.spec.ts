import { render, screen } from "@testing-library/angular";
import { PostComponent } from "./post.component";
import "@testing-library/jest-dom";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PostsService } from "../../services/posts/posts.service";
import userEvent from "@testing-library/user-event/";

describe("Given a Post component", () => {
  const post = {
    image: "testUrl",
    projectTitle: "testProjectTitle",
    shortDescription: "testShortDescription",
    fullDescription: "testFullDescription",
    stack: "testStack",
    technologies: ["testTechnology", "testTechnology2"],
    yearsOfExperience: "testExperience",
    creator: "Mock Creator",
    id: "1",
  };

  const mockPostsService = {
    deletePostById: jest.fn(),
  };
  const renderComponent = async () => {
    await render(PostComponent, {
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        provideMockStore(),
        { provide: PostsService, useValue: mockPostsService },
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

    test("Then it should show a button to delete the post", async () => {
      const ariaLabel = /delete icon/i;

      await renderComponent();
      const deleteButton = screen.getByRole("button", { name: ariaLabel });

      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the delete button", () => {
    test("Then the postsService's deletePostById method should be invoked", async () => {
      const ariaLabel = /delete icon/i;

      await renderComponent();
      const deleteButton = screen.getByRole("button", { name: ariaLabel });

      await userEvent.click(deleteButton);

      expect(mockPostsService.deletePostById).toHaveBeenCalled();
    });
  });
});
