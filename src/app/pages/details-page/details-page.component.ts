import { Component, Inject, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { type Observable } from "rxjs";
import { PostsService } from "../../services/posts/posts.service";
import { UiService } from "../../services/ui/ui.service";
import { type ApiResponsePost, type Post } from "../../store/posts/types";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent {
  post$!: Observable<ApiResponsePost>;
  post!: Post;
  params!: Record<string, string>;

  constructor(
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(PostsService) private readonly postsService: PostsService,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  ngOnInit(): void {
    this.showPost();
  }

  showPost() {
    this.uiService.showLoading();
    this.route.params.subscribe((params) => {
      this.params = params;
      this.post$ = this.postsService.loadPost(this.params["id"]);

      this.post$.subscribe((data) => {
        this.post = data.post;
        this.uiService.hideLoading();
      });
    });
  }
}
