import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { type Observable } from "rxjs";
import { type Post } from "../../store/post/types";
import { PostsService } from "../../services/posts/posts.service";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent {
  post$!: Observable<Post>;
  post!: Post;
  params!: Record<string, string>;
  isLogged = this.userService.getIsLogged();

  constructor(
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(PostsService) private readonly postsService: PostsService,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.uiService.showLoading();
    this.route.params.subscribe((params) => {
      this.params = params;
      this.postsService.loadPostById(this.params["id"]);
    });

    this.post$ = this.postsService.getPostState();

    this.post$.subscribe((data) => {
      this.post = data;
      this.uiService.hideLoading();
    });
  }

  deletePost() {
    this.postsService.deletePostById(this.post.id);
    this.uiService.redirectUser("");
  }

  allowAction() {
    try {
      const { username } = this.userService.checkUser();

      return this.isLogged && this.post.creator === username;
    } catch (error) {
      return false;
    }
  }
}
