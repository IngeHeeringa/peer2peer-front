import { loadPosts } from "./posts.actions";
import { reducer } from "./posts.reducer";
import { Stack, type Posts } from "./types";

describe("Given a Posts Reducer function", () => {
  describe("When it receives a list with two posts and a Load Posts action", () => {
    test("Then it should return an updated state including those two posts", () => {
      const currentPostsState: Posts = [];
      const posts: Posts = [
        {
          projectTitle: "Mock Project",
          imageUrl: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: Stack.fullStack,
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
        },
        {
          projectTitle: "Test Project",
          imageUrl: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: Stack.backEnd,
          technologies: ["Fake", "Test"],
          yearsOfExperience: "1-3 years",
        },
      ];
      const expectedPostsState: Posts = [
        {
          projectTitle: "Mock Project",
          imageUrl: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: Stack.fullStack,
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
        },
        {
          projectTitle: "Test Project",
          imageUrl: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: Stack.backEnd,
          technologies: ["Fake", "Test"],
          yearsOfExperience: "1-3 years",
        },
      ];

      const action = loadPosts({ payload: posts });

      const newPostsState = reducer(currentPostsState, action);

      expect(newPostsState).toStrictEqual(expectedPostsState);
    });
  });
});
