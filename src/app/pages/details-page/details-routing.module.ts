import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { DetailsPageComponent } from "./details-page.component";

const routes: Routes = [{ path: "", component: DetailsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
