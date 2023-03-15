import { Component, Inject, Input } from "@angular/core";
import { PostsService } from "../../services/posts/posts.service";
import { type Post } from "../../store/posts/types";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent {
  @Input() post!: Post;

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService
  ) {}

  deletePost() {
    this.postsService.deletePostById(this.post.id);
  }
}
