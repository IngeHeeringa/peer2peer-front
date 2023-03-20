import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { type Observable } from "rxjs";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean> = this.userService.getIsLogged();
  authUrls = ["/users/login", "/users/register"];

  constructor(
    @Inject(Router) public router: Router,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  getUserName() {
    const { username } = this.userService.checkUser();

    return username;
  }

  logoutUser() {
    this.userService.logout();
    this.uiService.redirectUser("");
  }
}
