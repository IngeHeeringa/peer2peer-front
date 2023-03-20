import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { postFeature } from "./post.reducer";

@NgModule({
  imports: [StoreModule.forFeature(postFeature)],
})
export class PostModule {}
