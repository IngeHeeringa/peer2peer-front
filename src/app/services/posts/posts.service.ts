import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, type Observable, throwError } from "rxjs";
import { deletePostById, loadPosts } from "../../store/posts/posts.actions";
import { selectPostsState } from "../../store/posts/posts.reducer";
import { environment } from "../../../environments/environment";
import { type ApiResponse } from "../../store/posts/types";
import { UiService } from "../ui/ui.service";
import { type CreatePostResponse } from "../../types";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  public postsUrl = `${environment.apiUrl}${environment.paths.posts}`;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(Store) private readonly store: Store
  ) {}

  loadPosts() {
    const posts$ = this.http
      .get<ApiResponse>(this.postsUrl)
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );

    posts$.subscribe((data: ApiResponse) => {
      const { posts } = data;

      this.store.dispatch(loadPosts({ payload: posts }));
    });
  }

  getPostsState() {
    return this.store.select(selectPostsState);
  }

  deletePostById(id: string) {
    this.uiService.showLoading();

    const response$ = this.http
      .delete(`${this.postsUrl}/delete/${id}`)
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
      .post<CreatePostResponse>(`${this.postsUrl}/submit`, postData)
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
    }

    if (error.message) {
      uiService.showErrorModal("Something went wrong");
    }

    return throwError(() => new Error(error.message));
  }
}
