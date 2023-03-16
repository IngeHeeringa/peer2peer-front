import { isDevMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserModule } from "./store/user/user.module";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { MaterialModule } from "./material/material.module";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UiModule } from "./store/ui/ui.module";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { PostsModule } from "./store/posts/posts.module";
import { PostComponent } from "./components/post/post.component";
import { PostsComponent } from "./components/posts/posts.component";
import { PostFormComponent } from "./components/post-form/post-form.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
    NavigationComponent,
    HomePageComponent,
    NotFoundPageComponent,
    LoadingComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    HeaderComponent,
    PostComponent,
    PostsComponent,
    PostFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    MaterialModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    PostsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
