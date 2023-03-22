import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginPageComponent } from "./login-page.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
