import { loadPost } from "./post.actions";
import { reducer } from "./post.reducer";
import { type Post } from "./types";

const post: Post = {
  projectTitle: "Mock Project",
  backupImage: "url",
  shortDescription: "Mock short description",
  fullDescription: "Mock full description",
  stack: "Mock Stack",
  technologies: ["Mock", "Test", "Fake"],
  yearsOfExperience: "<1 year",
  codeRepositoryLink: "https://github.com",
  creator: "Mock Creator",
  createdAt: new Date("2024-05-25"),
  id: "1",
};

describe("Given a Post Reducer function", () => {
  describe("When it receives a post and a Load Post action", () => {
    test("Then it should return an updated state including that post", () => {
      const currentPostState: Post = {
        backupImage: "",
        projectTitle: "",
        shortDescription: "",
        fullDescription: "",
        stack: "",
        technologies: [],
        yearsOfExperience: "",
        codeRepositoryLink: "https://github.com",
        creator: "",
        createdAt: new Date("2024-05-25"),
        id: "",
      };
      const expectedPostState: Post = {
        projectTitle: "Mock Project",
        backupImage: "url",
        shortDescription: "Mock short description",
        fullDescription: "Mock full description",
        stack: "Mock Stack",
        technologies: ["Mock", "Test", "Fake"],
        yearsOfExperience: "<1 year",
        codeRepositoryLink: "https://github.com",
        creator: "Mock Creator",
        createdAt: new Date("2024-05-25"),
        id: "1",
      };

      const action = loadPost({ payload: post });

      const newPostState = reducer(currentPostState, action);

      expect(newPostState).toStrictEqual(expectedPostState);
    });
  });
});
