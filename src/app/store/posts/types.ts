export interface Post {
  backupImage: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: string;
  technologies: string[];
  yearsOfExperience: string;
  creator: string;
  id: string;
}

export type Posts = Post[];

export interface ApiResponsePosts {
  posts: Posts;
}

export interface ApiResponsePost {
  post: Post;
}
