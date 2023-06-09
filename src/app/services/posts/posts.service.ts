import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, type Observable, throwError } from "rxjs";
import { deletePostById, loadPosts } from "../../store/posts/posts.actions";
import { selectPostsState } from "../../store/posts/posts.reducer";
import { selectPostState } from "../../store/post/post.reducer";
import { environment } from "../../../environments/environment";
import { type ApiResponsePosts, type Posts } from "../../store/posts/types";
import { UiService } from "../ui/ui.service";
import { type CreatePostResponse } from "../../types";
import { TokenService } from "../token/token.service";
import { loadPost } from "../../store/post/post.actions";
import { type ApiResponsePost } from "../../store/post/types";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  pageNumber!: number;
  posts!: Posts;
  public postsUrl = `${environment.apiUrl}${environment.paths.posts}`;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(Store) private readonly store: Store,
    @Inject(TokenService) private readonly tokenService: TokenService
  ) {}

  loadPosts(pageNumber: number) {
    this.pageNumber = pageNumber;

    const posts$ = this.http
      .get<ApiResponsePosts>(`${this.postsUrl}?page=${pageNumber}`)
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );

    posts$.subscribe((data: ApiResponsePosts) => {
      const { posts } = data;

      this.store.dispatch(loadPosts({ payload: posts }));
    });
  }

  loadPostById(id: string) {
    const post$ = this.http
      .get<ApiResponsePost>(`${this.postsUrl}/${id}`)
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );

    post$.subscribe((data) => {
      this.store.dispatch(loadPost({ payload: data.post }));
    });
  }

  getPostsState() {
    return this.store.select(selectPostsState);
  }

  getPostState() {
    return this.store.select(selectPostState);
  }

  deletePostById(id: string) {
    this.uiService.showLoading();

    const response$ = this.http
      .delete(`${this.postsUrl}/delete/${id}`, {
        headers: {
          Authorization: this.tokenService.getTokenBearer(),
        },
      })
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );

    response$.subscribe((data) => {
      this.store.dispatch(deletePostById({ payload: id }));
      this.uiService.showSuccessModal("Your post has been deleted");
      this.uiService.hideLoading();
    });
  }

  submitPost(postData: FormData): Observable<CreatePostResponse> {
    return this.http
      .post<CreatePostResponse>(`${this.postsUrl}/submit`, postData, {
        headers: {
          Authorization: this.tokenService.getTokenBearer(),
        },
      })
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error?.error) {
      uiService.showErrorModal(error.error.error as string);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal("Something went wrong");
    }

    return throwError(() => new Error(error.message));
  }
}
