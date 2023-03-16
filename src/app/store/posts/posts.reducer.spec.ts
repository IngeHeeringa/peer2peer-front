import { deletePostById, loadPosts } from "./posts.actions";
import { reducer } from "./posts.reducer";
import { type Posts } from "./types";

const posts: Posts = [
  {
    projectTitle: "Mock Project",
    image: "url",
    shortDescription: "Mock short description",
    fullDescription: "Mock full description",
    stack: "Mock Stack",
    technologies: ["Mock", "Test", "Fake"],
    yearsOfExperience: "<1 year",
    creator: "Mock Creator",
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
    creator: "Mock Creator",
    id: "2",
  },
];

describe("Given a Posts Reducer function", () => {
  describe("When it receives a list with two posts and a Load Posts action", () => {
    test("Then it should return an updated state including those two posts", () => {
      const currentPostsState: Posts = [];
      const expectedPostsState: Posts = [
        {
          projectTitle: "Mock Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
          creator: "Mock Creator",
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
          creator: "Mock Creator",
          id: "2",
        },
      ];

      const action = loadPosts({ payload: posts });

      const newPostsState = reducer(currentPostsState, action);

      expect(newPostsState).toStrictEqual(expectedPostsState);
    });
  });

  describe("When it receives a list with two posts and a Delete Post action with a payload of '1'", () => {
    test("Then it should return an updated state with only 1 post", () => {
      const currentPostsState: Posts = [
        {
          projectTitle: "Mock Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Mock", "Test", "Fake"],
          yearsOfExperience: "<1 year",
          creator: "Mock Creator",
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
          creator: "Mock Creator",
          id: "2",
        },
      ];
      const expectedPostsState: Posts = [
        {
          projectTitle: "Test Project",
          image: "url",
          shortDescription: "Mock short description",
          fullDescription: "Mock full description",
          stack: "Mock Stack",
          technologies: ["Fake", "Test"],
          yearsOfExperience: "1-3 years",
          creator: "Mock Creator",
          id: "2",
        },
      ];

      const action = deletePostById({ payload: "1" });

      const newPostsState = reducer(currentPostsState, action);

      expect(newPostsState).toStrictEqual(expectedPostsState);
    });
  });
});
