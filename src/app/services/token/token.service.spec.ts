import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { createMockStore } from "../../spec/mockStore";
import { mockLocalStorage } from "../../spec/mockLocalStorage";
import { TokenService } from "./token.service";

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Given a Token Service", () => {
  const tokenService = new TokenService();

  beforeEach(() => {
    localStorage.clear();
  });

  describe("When its method storeToken is invoked with the user's token", () => {
    test("Then it should store the user's token in localStorage", () => {
      const token = "abc";
      const key = "token";

      tokenService.storeToken(token);

      expect(mockLocalStorage.getItem(key)).toEqual(token);
    });
  });

  describe("When its method fetchToken is invoked and there is a token in localStorage", () => {
    test("Then it should return that token from localStorage", () => {
      const token = "abc";
      const key = "token";

      mockLocalStorage.setItem(key, token);

      const userToken = tokenService.fetchToken();

      expect(userToken).toEqual(token);
    });
  });

  describe("When its method removeToken is invoked and there is a token in localStorage", () => {
    test("Then that token should be deleted from localStorage", () => {
      const token = "abc";
      const key = "token";

      mockLocalStorage.setItem(key, token);

      tokenService.removeToken();

      expect(mockLocalStorage.getItem(key)).not.toBe(token);
    });
  });
});
