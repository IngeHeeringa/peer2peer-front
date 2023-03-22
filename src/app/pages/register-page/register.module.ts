import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterPageComponent } from "./register-page.component";
import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@NgModule({
  declarations: [RegisterPageComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
