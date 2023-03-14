import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, throwError, type Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Post, type ApiResponse, type Posts } from "../../store/posts/types";
import { UiService } from "../ui/ui.service";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  public postsUrl = `${environment.apiUrl}${environment.paths.posts}`;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  loadPosts(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(this.postsUrl)
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
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }
}
