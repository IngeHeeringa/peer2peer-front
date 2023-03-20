import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { PostsService } from "../../services/posts/posts.service";
import { PostsComponent } from "./posts.component";

describe("Given a Posts component", () => {
  describe("When rendered", () => {
    const posts$ = of([{}, {}, {}]);
    const mockPostsService = {
      loadPosts: jest.fn(() => of({ posts$ })),
      getPosts: jest.fn(),
    };
    const renderComponent = async () => {
      await render(PostsComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule, MatIconModule],
        providers: [
          provideMockStore(),
          { provide: PostsService, useValue: mockPostsService },
        ],
      });
    };

    test("Then it should show a Post component for every post in the list", async () => {
      await renderComponent();

      expect(mockPostsService.loadPosts).toHaveBeenCalled();
    });
  });
});
