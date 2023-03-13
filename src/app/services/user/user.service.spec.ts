import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { UserService } from "./user.service";
import { UiService } from "../ui/ui.service";
import { createMockStore } from "../../spec/mockStore";
import { Store } from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { loginUser } from "../../store/user/user.actions";

describe("Given a User Service", () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let uiService: UiService;
  const mockStore = createMockStore();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UserService,
        UiService,
        { provide: Store, useValue: mockStore },
      ],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    uiService = TestBed.inject(UiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("When its getToken method is invoked with credentials 'test@example.com' and password 'password123'", () => {
    test("Then it should make a POST request to the login endpoint", () => {
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };
      const mockResponse = { token: "mockToken" };

      userService.getToken(credentials).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${userService.userLoginEndpoint}`);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toEqual(credentials);

      req.flush(mockResponse);
    });
  });

  describe("When an HttpErrorResponse with an error field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: { error: "mockError" } };
      const spy = jest.spyOn(uiService, "showErrorModal");

      userService.handleError(mockError as HttpErrorResponse, uiService);
      expect(spy).toHaveBeenCalledWith(mockError.error.error);

      spy.mockRestore();
    });
  });

  describe("When an HttpErrorResponse with a message field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: "error", message: "mockError" };
      const spy = jest.spyOn(uiService, "showErrorModal");

      userService.handleError(mockError as HttpErrorResponse, uiService);
      expect(spy).toHaveBeenCalledWith(mockError.message);

      spy.mockRestore();
    });
  });

  describe("When its register method is invoked with valid register data'", () => {
    test("Then it should make a POST request to the register endpoint", () => {
      const registerData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const mockResponse = { message: "Register successful" };

      userService.register(registerData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${userService.userRegisterEndpoint}`);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toEqual(registerData);

      req.flush(mockResponse);
    });
  });

  describe("When its login method is invoked with an email and a token", () => {
    test("Then dispatch should be invoked with a Login User action", () => {
      const data = {
        email: "test@example.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtb2NrQHVzZXIuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.YPuy12VqswmM868VyJGPrrNSUWfyTC7GldVz2gLx9vU",
      };

      userService.login(data);

      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  describe("When its logout method is invoked", () => {
    test("Then dispatch should be invoked with a Logout User action", () => {
      userService.logout();

      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });
});
