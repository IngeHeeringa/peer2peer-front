import { Inject, Injectable } from "@angular/core";
import {
  Router,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  type UrlTree,
} from "@angular/router";
import { type Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UserService } from "../services/user/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  isLogged = false;

  constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkIsLogged();
  }

  checkIsLogged() {
    const isLogged$ = this.userService.getIsLogged();

    isLogged$.subscribe((data) => {
      this.isLogged = data;
    });

    if (!this.isLogged) {
      (async () =>
        this.router.navigate([
          `${environment.paths.users}${environment.paths.login}`,
        ]))();
    }

    return this.isLogged;
  }
}
