import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { type Observable, of } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { selectIsLogged } from "../../store/user/user.reducer";
import { HomePageComponent } from "./home-page.component";

describe("Given a HomePageComponent", () => {
  describe("When rendered", () => {
    const renderComponent = async () => {
      await render(HomePageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
        ],
      });
    };

    test("Then it should show the 'peer2peer' logo", async () => {
      const altText = /peer2peer logo/i;

      await renderComponent();

      const logo = screen.getByRole("img", { name: altText });

      expect(logo).toBeInTheDocument();
    });

    test("Then it should show the title 'All posts' in a heading", async () => {
      const title = /all posts/i;

      await renderComponent();
      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user is not logged", () => {
    const renderComponent = async () => {
      await render(HomePageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
        ],
      });
    };

    test("Then it should show a call to action to sign up", async () => {
      const ctaText = /sign up/i;

      await renderComponent();

      const cta = screen.getByRole("link", { name: ctaText });

      expect(cta).toBeInTheDocument();
    });

    test("Then it should show a call to action to log in", async () => {
      const ctaText = /log in/i;

      await renderComponent();

      const cta = screen.getByRole("link", { name: ctaText });

      expect(cta).toBeInTheDocument();
    });
  });

  describe("When the user is logged", () => {
    const renderComponent = async () => {
      await render(HomePageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
        ],
      });
    };

    test("Then it should show a button to log out", async () => {
      const buttonText = /log out/i;

      await renderComponent();

      const button = screen.getByRole("link", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the 'Logout' button", () => {
    const isLogged$: Observable<boolean> = of(true);
    const mockUserService = {
      getIsLogged: jest.fn(() => isLogged$),
      logout: jest.fn(),
    };
    const renderComponent = async () => {
      await render(HomePageComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: isLogged$ }],
          }),
          { provide: UserService, useValue: mockUserService },
        ],
      });
    };

    test("Then the component's logoutUser method should be invoked", async () => {
      const buttonText = /log out/i;

      await renderComponent();
      const logoutButton = screen.getByRole("link", { name: buttonText });

      await userEvent.click(logoutButton);

      expect(mockUserService.logout).toHaveBeenCalled();
    });
  });
});
