import { Component, Inject, Input } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { PostsService } from "../../services/posts/posts.service";
import { type Post } from "../../store/posts/types";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent {
  @Input() post!: Post;
  isLogged = this.userService.getIsLogged();

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  deletePost() {
    this.postsService.deletePostById(this.post.id);
  }

  allowAction() {
    const { username } = this.userService.checkUser();

    return this.isLogged && this.post.creator === username;
  }
}
