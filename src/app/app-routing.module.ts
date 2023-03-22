import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { HomePageComponent } from "./pages/home-page/home-page.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "users/register",
    loadChildren: async () =>
      (await import("./pages/register-page/register.module")).RegisterModule,
  },
  {
    path: "posts/new-post",
    loadChildren: async () =>
      (await import("./pages/submit-page/submit.module")).SubmitModule,
    canActivate: [AuthGuard],
  },
  {
    path: "users/login",
    loadChildren: async () =>
      (await import("./pages/login-page/login.module")).LoginModule,
  },
  {
    path: "posts/details/:id",
    loadChildren: async () =>
      (await import("./pages/details-page/details.module")).DetailsModule,
  },
  {
    path: "**",
    loadChildren: async () =>
      (await import("./pages/not-found-page/not-found.module")).NotFoundModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
