import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { UserService } from "../../services/user/user.service";
import { selectIsLogged } from "../../store/user/user.reducer";
import { HeaderComponent } from "./header.component";
import { type Observable, of } from "rxjs";
import userEvent from "@testing-library/user-event";
import { NavigationComponent } from "../navigation/navigation.component";
import { AppModule } from "../../app.module";
import { TokenService } from "../../services/token/token.service";

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

describe("Given a Header component", () => {
  describe("When rendered", () => {
    test("Then it should show the 'peer2peer' logo", async () => {
      const altText = /peer2peer logo/i;

      await render(HeaderComponent, {
        declarations: [NavigationComponent],
        imports: [AppModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
          { provide: UserService, useValue: mockUserServiceTrue },
          { provide: TokenService, useValue: mockTokenServiceTrue },
        ],
      });

      const logo = screen.getByRole("img", { name: altText });

      expect(logo).toBeInTheDocument();
    });
  });

  describe("When the user is not logged", () => {
    const renderComponent = async () => {
      await render(HeaderComponent, {
        declarations: [NavigationComponent],
        imports: [AppModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
        ],
      });
    };

    test("Then it should not show the user's username", async () => {
      const expectedUserInformation = /logged in as/;

      await render(HeaderComponent, {
        declarations: [NavigationComponent],
        imports: [AppModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
          { provide: UserService, useValue: mockUserServiceFalse },
          { provide: TokenService, useValue: mockTokenServiceFalse },
        ],
      });

      const userInformation = screen.queryByText(expectedUserInformation);

      expect(userInformation).not.toBeInTheDocument();
    });

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
      await render(HeaderComponent, {
        declarations: [NavigationComponent],
        imports: [AppModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
          { provide: UserService, useValue: mockUserServiceTrue },
          { provide: TokenService, useValue: mockTokenServiceTrue },
        ],
      });
    };

    test("Then it should show the user's username", async () => {
      const expectedUserInformation = /logged in as/i;

      await renderComponent();

      const userInformation = screen.getByText(expectedUserInformation);

      expect(userInformation).toBeInTheDocument();
    });

    test("Then it should show a button to log out", async () => {
      const buttonText = /log out/i;

      await renderComponent();

      const logoutButton = screen.getByRole("link", { name: buttonText });

      expect(logoutButton).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the 'Logout' button", () => {
    const isLogged$: Observable<boolean> = of(true);
    const mockUserService = {
      getIsLogged: jest.fn(() => isLogged$),
      checkUser: jest.fn().mockReturnValue({ username: "Mock Creator" }),
      logout: jest.fn(),
    };
    const renderComponent = async () => {
      await render(HeaderComponent, {
        declarations: [NavigationComponent],
        imports: [AppModule, HttpClientTestingModule, MatSnackBarModule],
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
