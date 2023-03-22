import { isDevMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http";
import { UserModule } from "./store/user/user.module";
import { MaterialModule } from "./material/material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UiModule } from "./store/ui/ui.module";
import { LoadingComponent } from "./components/loading/loading.component";
import { HeaderComponent } from "./components/header/header.component";
import { PostsModule } from "./store/posts/posts.module";
import { PostComponent } from "./components/post/post.component";
import { PostsComponent } from "./components/posts/posts.component";
import { PostModule } from "./store/post/post.module";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    LoadingComponent,
    HeaderComponent,
    PostComponent,
    PostsComponent,
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
    HttpClientModule,
    UiModule,
    PostsModule,
    PostModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
