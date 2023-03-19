import { createFeature, createReducer, on } from "@ngrx/store";
import { type Post } from "../store/posts/types";
import { loadPostById } from "./post.actions";

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
      loadPostById,
      (currentState, { payload }): Post => ({
        ...payload,
      })
    )
  ),
});

export const { name: postFeatureKey, selectPostState, reducer } = postFeature;
