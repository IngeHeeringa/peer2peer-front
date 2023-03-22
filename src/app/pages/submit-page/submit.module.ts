import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubmitRoutingModule } from "./submit-routing.module";
import { SubmitPageComponent } from "./submit-page.component";
import { PostFormComponent } from "../../components/post-form/post-form.component";
import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SubmitPageComponent, PostFormComponent],
  imports: [
    CommonModule,
    SubmitRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SubmitModule {}
