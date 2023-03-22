import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page.component";

const routes: Routes = [{ path: "", component: LoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
