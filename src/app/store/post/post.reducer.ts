import { createFeature, createReducer, on } from "@ngrx/store";
import { type Post } from "../posts/types";
import { loadPost } from "./post.actions";

export const initialState: Post = {
  backupImage: "",
  projectTitle: "",
  shortDescription: "",
  fullDescription: "",
  stack: "",
  technologies: [],
  yearsOfExperience: "",
  creator: "",
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
