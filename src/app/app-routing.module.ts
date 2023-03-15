import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "users/login",
    component: LoginPageComponent,
  },
  {
    path: "users/register",
    component: RegisterPageComponent,
  },
  { path: "**", redirectTo: "/404" },
  { path: "404", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
