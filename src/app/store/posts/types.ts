import { type Post } from "../post/types";

export type Posts = Post[];

export interface ApiResponsePosts {
  posts: Posts;
  totalPosts: number;
}
