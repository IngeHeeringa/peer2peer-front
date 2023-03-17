import { Component, Inject, type OnInit } from "@angular/core";
import decode from "jwt-decode";
import { type Observable } from "rxjs";
import { TokenService } from "./services/token/token.service";
import { UiService } from "./services/ui/ui.service";
import { UserService } from "./services/user/user.service";
import { type CustomTokenPayloadEmail } from "./types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean> = this.uiService.getIsLoading();

  constructor(
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(TokenService) private readonly tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.checkIsLogged();
  }

  private checkIsLogged() {
    const token = this.tokenService.fetchToken();

    if (token) {
      const { email }: CustomTokenPayloadEmail = decode(token);

      this.userService.login({ email, token });
    }
  }
}
