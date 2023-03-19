import { Component, Input } from "@angular/core";
import { type Post } from "../../store/posts/types";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent {
  @Input() post!: Post;
}
