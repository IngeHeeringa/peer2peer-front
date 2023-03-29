import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsRoutingModule } from "./details-routing.module";
import { DetailsPageComponent } from "./details-page.component";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [DetailsPageComponent],
  imports: [CommonModule, DetailsRoutingModule, MaterialModule],
})
export class DetailsModule {}
