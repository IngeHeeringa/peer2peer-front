export interface Post {
  imageUrl: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: Stack;
  technologies: string[];
  yearsOfExperience: string;
}

export enum Stack {
  frontEnd,
  backEnd,
  fullStack,
}

export type Posts = Post[];

export interface ApiResponse {
  posts: Posts;
}
