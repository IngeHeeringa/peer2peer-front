import { createAction, props } from "@ngrx/store";
import { type Post } from "./types";

export const loadPost = createAction(
  "[Posts] Load Post",
  props<{ payload: Post }>()
);
