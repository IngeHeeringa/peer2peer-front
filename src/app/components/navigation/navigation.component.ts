import { Component, Inject } from "@angular/core";
import { type Observable } from "rxjs";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  isLogged$: Observable<boolean> = this.userService.getIsLogged();

  constructor(@Inject(UserService) private readonly userService: UserService) {}
}
