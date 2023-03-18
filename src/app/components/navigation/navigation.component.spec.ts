import { NavigationComponent } from "./navigation.component";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { provideMockStore } from "@ngrx/store/testing";
import { selectIsLogged } from "../../store/user/user.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("Given a Navigation component", () => {
  describe("When rendered", () => {
    test("Then it should show a link to 'Home'", async () => {
      await render(NavigationComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
        ],
      });

      const link = screen.getByRole("link", { name: /home/i });

      expect(link).toBeInTheDocument();
    });
  });

  describe("When rendered and the user is logged in", () => {
    test("Then it should show a link to 'New post'", async () => {
      await render(NavigationComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: true }],
          }),
        ],
      });

      const link = screen.getByRole("link", { name: /new post/i });

      expect(link).toBeInTheDocument();
    });
  });
});
