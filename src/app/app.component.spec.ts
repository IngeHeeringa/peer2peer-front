import { MatIconModule } from "@angular/material/icon";
import { provideMockStore } from "@ngrx/store/testing";
import { render } from "@testing-library/angular";
import { type Observable, of } from "rxjs";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { HeaderComponent } from "./components/header/header.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { TokenService } from "./services/token/token.service";
import { UiService } from "./services/ui/ui.service";
import { UserService } from "./services/user/user.service";
import { selectIsLoading } from "./store/ui/ui.reducer";
import { selectIsLogged } from "./store/user/user.reducer";

describe("Given an App component", () => {
  describe("When rendered", () => {
    const isLoading$: Observable<boolean> = of(true);
    const isLogged$: Observable<boolean> = of(true);
    const mockUiService = {
      getIsLoading: jest.fn(() => isLoading$),
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    };
    const mockUserService = {
      getIsLogged: jest.fn(() => isLogged$),
      login: jest.fn(),
      logout: jest.fn(),
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
              { selector: selectIsLoading, value: isLoading$ },
              { selector: selectIsLogged, value: isLogged$ },
            ],
          }),
          { provide: UserService, useValue: mockUserService },
          { provide: UiService, useValue: mockUiService },
          { provide: TokenService, useValue: mockTokenService },
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
