import { createAction, props } from "@ngrx/store";
import { type Post } from "../store/posts/types";

export const loadPostById = createAction(
  "[Posts] Load Post",
  props<{ payload: Post }>()
);
