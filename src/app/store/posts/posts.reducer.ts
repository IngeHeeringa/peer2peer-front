import { createFeature, createReducer, on } from "@ngrx/store";
import { deletePostById, loadPosts } from "./posts.actions";
import { type Posts } from "./types";

export const initialState: Posts = [];

export const postsFeature = createFeature({
  name: "posts",
  reducer: createReducer(
    initialState,
    on(loadPosts, (currentState, { payload }): Posts => [...payload]),

    on(
      deletePostById,
      (currentState, { payload }): Posts =>
        currentState.filter((post) => post.id !== payload)
    )
  ),
});

export const {
  name: postsFeatureKey,
  selectPostsState,
  reducer,
} = postsFeature;
