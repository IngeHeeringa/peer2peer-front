import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { DetailsPageComponent } from "./pages/details-page/details-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { SubmitPageComponent } from "./pages/submit-page/submit-page.component";

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
  {
    path: ":id",
    component: DetailsPageComponent,
  },
  {
    path: "posts/new-post",
    component: SubmitPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/404" },
  { path: "404", component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
