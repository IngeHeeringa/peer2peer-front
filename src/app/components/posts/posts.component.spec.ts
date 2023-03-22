import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen, waitFor } from "@testing-library/angular";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event/";
import { of } from "rxjs";
import { selectPostsState } from "../../store/posts/posts.reducer";
import { PostsService } from "../../services/posts/posts.service";
import { PostsComponent } from "./posts.component";

const mockPosts = new Array(20).fill({
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
});

describe("Given a Posts component", () => {
  const mockPostsService = {
    pageNumber: 2,
    loadPosts: jest.fn(() => of({ mockPosts })),
    getPostsState: jest.fn().mockReturnValue(of(mockPosts)),
    checkPosts: jest.fn(),
  };
  const renderComponent = async () => {
    await render(PostsComponent, {
      imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectPostsState, value: mockPosts }],
        }),
        { provide: PostsService, useValue: mockPostsService },
      ],
    });
  };

  describe("When rendered", () => {
    test("Then it should show a Post component for every post in the list", async () => {
      await renderComponent();

      expect(mockPostsService.loadPosts).toHaveBeenCalled();
      expect(mockPostsService.getPostsState).toHaveBeenCalled();
    });
  });

  describe("When there are more than 8 posts in the database", () => {
    test("Then it should show a button to go to the next page", async () => {
      const nextPage = /next page/i;
      await renderComponent();

      const button = screen.getByRole("button", { name: nextPage });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the 'Next page' button", () => {
    test("Then the Posts Service's loadPosts method should be invoked", async () => {
      const nextPage = /next page/i;

      await renderComponent();

      const button = screen.getByRole("button", { name: nextPage });
      await userEvent.click(button);

      expect(mockPostsService.loadPosts).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the 'Previous page' button", () => {
    test("Then the Posts Service's loadPosts method should be invoked", async () => {
      const nextPage = /next page/i;
      const previousPage = /previous page/i;

      await renderComponent();

      const nextButton = screen.getByRole("button", { name: nextPage });
      await userEvent.click(nextButton);
      const previousButton = screen.getByRole("button", {
        name: previousPage,
      });
      await userEvent.click(previousButton);

      expect(mockPostsService.loadPosts).toHaveBeenCalled();
    });
  });
});
