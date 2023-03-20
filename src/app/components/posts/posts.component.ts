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
  posts!: Posts;

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.postsService.loadPosts();
    this.posts$ = this.postsService.getPostsState();
    this.checkPosts();
  }

  checkPosts() {
    const posts = this.postsService.getPostsState();
    posts.subscribe((data) => {
      this.posts = data;
    });
  }
}
