import { loadPosts } from "./posts.actions";
import { reducer } from "./posts.reducer";
import { type Posts } from "./types";

describe("Given a Posts Reducer function", () => {
  describe("When it receives a list with two posts and a Load Posts action", () => {
    test("Then it should return an updated state including those two posts", () => {
      const currentPostsState: Posts = [];
      const posts: Posts = [
        {
          projectTitle: "Mock Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
          id: "1",
        },
        {
          projectTitle: "Test Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Fake", "Test"],
          yearsOfExperience: "1-3 years",
          id: "2",
        },
      ];
      const expectedPostsState: Posts = [
        {
          projectTitle: "Mock Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
          id: "1",
        },
        {
          projectTitle: "Test Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Fake", "Test"],
          yearsOfExperience: "1-3 years",
          id: "2",
        },
      ];

      const action = loadPosts({ payload: posts });

      const newPostsState = reducer(currentPostsState, action);

      expect(newPostsState).toStrictEqual(expectedPostsState);
    });
  });
});
