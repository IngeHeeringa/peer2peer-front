import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { DetailsRoutingModule } from "./details-routing.module";
import { DetailsPageComponent } from "./details-page.component";

@NgModule({
  declarations: [DetailsPageComponent],
  imports: [CommonModule, DetailsRoutingModule, NgOptimizedImage],
})
export class DetailsModule {}
