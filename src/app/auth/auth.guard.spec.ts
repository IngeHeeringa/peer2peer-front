import { Router } from "@angular/router";
import { createMock } from "@testing-library/angular/jest-utils";
import { of } from "rxjs";
import { UserService } from "../services/user/user.service";
import { AuthGuard } from "./auth.guard";

const userService = createMock(UserService);
const router = createMock(Router);

describe("Given an AuthGuard", () => {
  describe("When its method canActivate is invoked and the user is logged in", () => {
    test("Then it should return true", () => {
      userService.getIsLogged = jest.fn().mockReturnValue(of(true));

      const authGuard = new AuthGuard(router, userService);
      const authGuardResult = authGuard.canActivate();

      expect(authGuardResult).toEqual(true);
    });
  });

  describe("When its method canActivate is invoked and the user is not logged in", () => {
    test("Then it should return false", () => {
      userService.getIsLogged = jest.fn().mockReturnValue(of(false));

      const authGuard = new AuthGuard(router, userService);
      const authGuardResult = authGuard.canActivate();

      expect(authGuardResult).toEqual(false);
    });
  });
});
