import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { PostsService } from "../../services/posts/posts.service";
import { DetailsPageComponent } from "./details-page.component";

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

describe("Given a DetailsPageComponent", () => {
  describe("When rendered", () => {
    const post$ = of(mockPost);
    const mockPostsService = {
      loadPostById: jest.fn(() => of({ post$ })),
      getPostState: jest.fn().mockReturnValue(post$),
    };
    const renderComponent = async () => {
      await render(DetailsPageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore(),
          { provide: PostsService, useValue: mockPostsService },
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
});
