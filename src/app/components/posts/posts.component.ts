import { Component, Inject } from "@angular/core";
import { type Observable } from "rxjs";
import { PostsService } from "../../services/posts/posts.service";
import { type Posts } from "../../store/posts/types";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
  posts$!: Observable<Posts>;

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService
  ) {}

  ngOnInit(): void {
    try {
      this.posts$ = this.postsService.getPostsState();

      this.postsService.loadPosts();
    } catch (error) {}
  }
}
