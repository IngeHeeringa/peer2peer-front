import { createFeature, createReducer, on } from "@ngrx/store";
import { type Post } from "../post/types";
import { loadPost } from "./post.actions";

export const initialState: Post = {
  backupImage: "",
  projectTitle: "",
  shortDescription: "",
  fullDescription: "",
  stack: "",
  technologies: [],
  yearsOfExperience: "",
  codeRepositoryLink: "",
  creator: "",
  createdAt: new Date("2024-05-25"),
  id: "",
};

export const postFeature = createFeature({
  name: "post",
  reducer: createReducer(
    initialState,
    on(
      loadPost,
      (currentState, { payload }): Post => ({
        ...payload,
      })
    )
  ),
});

export const { name: postFeatureKey, selectPostState, reducer } = postFeature;
