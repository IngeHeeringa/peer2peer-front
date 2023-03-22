import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { RegisterPageComponent } from "./register-page.component";

const routes: Routes = [{ path: "", component: RegisterPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
