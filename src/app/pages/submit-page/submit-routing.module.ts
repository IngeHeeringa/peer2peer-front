import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { SubmitPageComponent } from "./submit-page.component";

const routes: Routes = [{ path: "", component: SubmitPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitRoutingModule {}
