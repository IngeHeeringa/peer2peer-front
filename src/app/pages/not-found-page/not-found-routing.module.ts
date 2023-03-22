import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { NotFoundPageComponent } from "./not-found-page.component";

const routes: Routes = [{ path: "", component: NotFoundPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
