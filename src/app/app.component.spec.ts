import { MatIconModule } from "@angular/material/icon";
import { provideMockStore } from "@ngrx/store/testing";
import { render } from "@testing-library/angular";
import { of } from "rxjs";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { HeaderComponent } from "./components/header/header.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { PostsService } from "./services/posts/posts.service";
import { TokenService } from "./services/token/token.service";
import { UiService } from "./services/ui/ui.service";
import { UserService } from "./services/user/user.service";
import { selectIsLoading } from "./store/ui/ui.reducer";
import { selectIsLogged } from "./store/user/user.reducer";

const mockPosts = [
  {
    projectTitle: "Mock Project",
    backupImage: "url",
    shortDescription: "Mock short description",
    fullDescription: "Mock full description",
    stack: "Mock Stack",
    technologies: ["Mock", "Test", "Fake"],
    yearsOfExperience: "<1 year",
    creator: "Mock Creator",
    id: "1",
  },
  {
    projectTitle: "Mock Project",
    backupImage: "url",
    shortDescription: "Mock short description",
    fullDescription: "Mock full description",
    stack: "Mock Stack",
    technologies: ["Mock", "Test", "Fake"],
    yearsOfExperience: "<1 year",
    creator: "Mock Creator",
    id: "2",
  },
];

const posts$ = of([{}, {}, {}]);

describe("Given an App component", () => {
  describe("When rendered", () => {
    const mockUiService = {
      getIsLoading: jest.fn(() => of(true)),
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    };
    const mockUserService = {
      getIsLogged: jest.fn(() => of(true)),
      checkUser: jest.fn().mockReturnValue({ username: "Mock Creator" }),
      login: jest.fn(),
      logout: jest.fn(),
    };
    const mockPostsService = {
      loadPosts: jest.fn(() => of({ posts$ })),
      getPostsState: jest.fn().mockReturnValue(of(mockPosts)),
      checkPosts: jest.fn(),
    };
    const mockTokenService = {
      fetchToken: jest.fn(
        () =>
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtb2NrQHVzZXIuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.YPuy12VqswmM868VyJGPrrNSUWfyTC7GldVz2gLx9vU"
      ),
    };

    const renderComponent = async () => {
      await render(AppComponent, {
        imports: [AppModule, MatIconModule],
        declarations: [HeaderComponent, LoadingComponent, NavigationComponent],
        providers: [
          provideMockStore({
            selectors: [
              { selector: selectIsLoading, value: true },
              { selector: selectIsLogged, value: true },
            ],
          }),
          { provide: UserService, useValue: mockUserService },
          { provide: UiService, useValue: mockUiService },
          { provide: TokenService, useValue: mockTokenService },
          { provide: PostsService, useValue: mockPostsService },
        ],
      });
    };

    test("Then it should invoke its checkIsLogged method", async () => {
      await renderComponent();

      expect(mockUiService.getIsLoading).toHaveBeenCalled();
      expect(mockTokenService.fetchToken).toHaveBeenCalled();
      expect(mockUserService.login).toHaveBeenCalled();
    });

    test("Then it should invoke the Ui Service's getIsLoading method", async () => {
      await renderComponent();

      expect(mockUiService.getIsLoading).toHaveBeenCalled();
    });
  });
});
