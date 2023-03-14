import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { UiService } from "../ui/ui.service";
import { createMockStore } from "../../spec/mockStore";
import { Store } from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PostsService } from "./posts.service";
import { loadPosts } from "../../store/posts/posts.actions";

describe("Given a Posts Service", () => {
  let postsService: PostsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let uiService: UiService;
  const store = createMockStore();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [PostsService, UiService, { provide: Store, useValue: store }],
    });

    postsService = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    uiService = TestBed.inject(UiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("When loadPosts method is invoked and succeeds", () => {
    test("Then it should dispatch a loadPosts action with the posts payload", () => {
      const mockApiResponse = {
        posts: [],
      };
      const spy = jest.spyOn(store, "dispatch");

      postsService.loadPosts();
      const req = httpMock.expectOne(`${postsService.postsUrl}`);
      req.flush(mockApiResponse);

      expect(spy).toHaveBeenCalledWith(
        loadPosts({ payload: mockApiResponse.posts })
      );

      spy.mockRestore();
    });
  });

  describe("When its loadPosts method is invoked", () => {
    test("Then it should make a GET request to the posts endpoint", () => {
      postsService.loadPosts();

      const req = httpMock.expectOne(`${postsService.postsUrl}`);
      expect(req.request.method).toEqual("GET");
    });
  });

  describe("When an HttpErrorResponse with an error field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: { error: "mockError" } };
      const spy = jest.spyOn(uiService, "showErrorModal");

      postsService.handleError(mockError as HttpErrorResponse, uiService);
      expect(spy).toHaveBeenCalledWith(mockError.error.error);

      spy.mockRestore();
    });
  });

  describe("When an HttpErrorResponse with a message field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: "error", message: "mockError" };
      const spy = jest.spyOn(uiService, "showErrorModal");

      postsService.handleError(mockError as HttpErrorResponse, uiService);
      expect(spy).toHaveBeenCalledWith(mockError.message);

      spy.mockRestore();
    });
  });

  describe("When its loadPosts method is invoked and fails", () => {
    test("Then it should call its handleError method", () => {
      const errorEvent = new ProgressEvent("error");

      const spy = jest.spyOn(postsService, "handleError");

      postsService.loadPosts();

      const req = httpMock.expectOne(`${postsService.postsUrl}`);
      req.error(errorEvent);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });
});
