import { createFeature, createReducer, on } from "@ngrx/store";
import { loadPosts } from "./posts.actions";
import { type Posts } from "./types";

export const initialState: Posts = [];

export const postsFeature = createFeature({
  name: "posts",
  reducer: createReducer(
    initialState,
    on(loadPosts, (currentState, { payload }): Posts => [...payload])
  ),
});

export const {
  name: postsFeatureKey,
  selectPostsState,
  reducer,
} = postsFeature;
