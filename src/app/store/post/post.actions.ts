import { createAction, props } from "@ngrx/store";
import { type Post } from "../posts/types";

export const loadPost = createAction(
  "[Posts] Load Post",
  props<{ payload: Post }>()
);
