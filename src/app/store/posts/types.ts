export interface Post {
  image: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: string;
  technologies: string[];
  yearsOfExperience: string;
  id: string;
}

export type Posts = Post[];

export interface ApiResponse {
  posts: Posts;
}
