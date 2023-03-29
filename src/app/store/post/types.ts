export interface Post {
  backupImage: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: string;
  technologies: string[];
  yearsOfExperience: string;
  codeRepositoryLink: string | undefined;
  creator: string;
  createdAt: Date;
  id: string;
}

export interface ApiResponsePost {
  post: Post;
}
