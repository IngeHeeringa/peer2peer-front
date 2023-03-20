/* eslint-disable @typescript-eslint/consistent-type-assertions */
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
import { deletePostById, loadPosts } from "../../store/posts/posts.actions";
import { loadPost } from "../../store/post/post.actions";

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

  describe("When its loadPosts method is invoked and succeeds", () => {
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

    test("Then it should make a GET request to the posts endpoint", () => {
      postsService.loadPosts();

      const req = httpMock.expectOne(`${postsService.postsUrl}`);
      expect(req.request.method).toEqual("GET");
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

  describe("When its loadPost method is invoked and succeeds", () => {
    const mockResponse = {
      post: {
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
    };
    test("Then it should dispatch a loadPost action with the post payload", () => {
      const spy = jest.spyOn(store, "dispatch");

      postsService.loadPost(mockResponse.post.id);
      const req = httpMock.expectOne(
        `${postsService.postsUrl}/${mockResponse.post.id}`
      );
      req.flush(mockResponse);

      expect(spy).toHaveBeenCalledWith(
        loadPost({ payload: mockResponse.post })
      );

      spy.mockRestore();
    });

    test("Then it should make a GET request to the posts endpoint", () => {
      postsService.loadPost(mockResponse.post.id);

      const req = httpMock.expectOne(
        `${postsService.postsUrl}/${mockResponse.post.id}`
      );
      expect(req.request.method).toEqual("GET");
    });
  });

  describe("When its loadPost method is invoked and fails", () => {
    const mockResponse = {
      post: {
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
    };
    test("Then it should call its handleError method", () => {
      const errorEvent = new ProgressEvent("error");

      const spy = jest.spyOn(postsService, "handleError");

      postsService.loadPost(mockResponse.post.id);

      const req = httpMock.expectOne(
        `${postsService.postsUrl}/${mockResponse.post.id}`
      );
      req.error(errorEvent);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe("When its deletePostById method is invoked with a post's id", () => {
    test("Then it should make a DELETE request to the posts/delete endpoint with the post's id", () => {
      postsService.deletePostById("1");

      const req = httpMock.expectOne(`${postsService.postsUrl}/delete/1`);
      expect(req.request.method).toEqual("DELETE");
    });

    test("Then it should dispatch a deletePostById action with a payload of the post's id", () => {
      const mockApiResponse = {
        message: "Post deleted successfully",
      };
      const spy = jest.spyOn(store, "dispatch");

      postsService.deletePostById("1");
      const req = httpMock.expectOne(`${postsService.postsUrl}/delete/1`);
      req.flush(mockApiResponse);

      expect(spy).toHaveBeenCalledWith(deletePostById({ payload: "1" }));

      spy.mockRestore();
    });
  });

  describe("When its deletePostById method is invoked and fails", () => {
    test("Then it should call its handleError method", () => {
      const errorEvent = new ProgressEvent("error");

      const spy = jest.spyOn(postsService, "handleError");

      postsService.deletePostById("3");

      const req = httpMock.expectOne(`${postsService.postsUrl}/delete/3`);
      req.error(errorEvent);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe("When its submitPost method is invoked with valid form data'", () => {
    test("Then it should make a POST request to the submit endpoint", () => {
      const formData = {} as FormData;
      const mockResponse = { message: "Register successful" };

      postsService.submitPost(formData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${postsService.postsUrl}/submit`);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toEqual(formData);

      req.flush(mockResponse);
    });
  });

  describe("When its submitPost method is invoked and fails", () => {
    test("Then it should call its handleError method", () => {
      const formData = {} as FormData;

      const spy = jest.spyOn(postsService, "handleError");

      const errorEvent = new ProgressEvent("error");

      postsService.submitPost(formData).subscribe({
        error() {
          expect(spy).toHaveBeenCalled();
          spy.mockRestore();
        },
      });

      const req = httpMock.expectOne(`${postsService.postsUrl}/submit`);

      req.error(errorEvent);

      spy.mockRestore();
    });
  });

  describe("When an HttpErrorResponse with an error field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: { error: "Could not retrieve any posts" } };
      const spy = jest.spyOn(uiService, "showErrorModal");

      const result = postsService.handleError(
        mockError as HttpErrorResponse,
        uiService
      );
      expect(spy).toHaveBeenCalledWith(mockError.error.error);
      result.subscribe({
        error(error) {
          expect(error).toEqual(mockError);
        },
      });

      spy.mockRestore();
    });
  });

  describe("When an HttpErrorResponse with a message field is thrown", () => {
    test("Then it should call the showErrorModal method of the uiService", () => {
      const mockError = { error: "error", message: "Something went wrong" };
      const spy = jest.spyOn(uiService, "showErrorModal");

      postsService.handleError(mockError as HttpErrorResponse, uiService);
      expect(spy).toHaveBeenCalledWith(mockError.message);

      spy.mockRestore();
    });
  });
});
