import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, throwError } from "rxjs";
import { loadPosts } from "../../store/posts/posts.actions";
import { selectPostsState } from "../../store/posts/posts.reducer";
import { environment } from "../../../environments/environment";
import { type ApiResponse } from "../../store/posts/types";
import { UiService } from "../ui/ui.service";

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
    this.uiService.showLoading();
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

    this.uiService.hideLoading();
  }

  getPosts() {
    return this.store.select(selectPostsState);
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error?.error) {
      uiService.showErrorModal(error.error.error as string);
      return throwError(() => new Error(error.error.error as string));
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }
}
