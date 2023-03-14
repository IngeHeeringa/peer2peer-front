import { Component, Inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { UiService } from "../../services/ui/ui.service";
import { PostsService } from "../../services/posts/posts.service";
import { type Posts } from "../../store/posts/types";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
  posts$: Observable<Posts> = this.getPosts();

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    return this.postsService
      .loadPosts()
      .pipe(map((response) => response.posts));
  }
}
