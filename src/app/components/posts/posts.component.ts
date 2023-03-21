import { Component, Inject } from "@angular/core";
import { type Observable } from "rxjs";
import { loadPosts } from "src/app/store/posts/posts.actions";
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
  nextPage!: number;

  constructor(
    @Inject(PostsService) private readonly postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.postsService.loadPosts(1);
    this.posts$ = this.postsService.getPostsState();
    this.checkPosts();
  }

  checkPosts() {
    const posts = this.postsService.getPostsState();
    posts.subscribe((data) => {
      this.posts = data;
    });
  }

  goToPreviousPage() {
    this.nextPage = this.postsService.pageNumber - 1;
    this.postsService.loadPosts(this.nextPage);
  }

  goToNextPage() {
    this.nextPage = this.postsService.pageNumber + 1;
    this.postsService.loadPosts(this.nextPage);
  }
}
