export interface Post {
  imageUrl: string;
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

export interface ApiResponse {
  posts: Posts;
}
