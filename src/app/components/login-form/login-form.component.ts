import decode from "jwt-decode";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { CustomTokenPayload, UserCredentials } from "../../types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user/actions/user.actions";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly store: Store
  ) {}

  onSubmit() {
    const userCredentials = this.loginForm.value as UserCredentials;

    this.userService.login(userCredentials).subscribe(async (data) => {
      const { token } = data;

      const { email } = decode(token) as CustomTokenPayload;

      localStorage.setItem("token", token);

      this.store.dispatch(loginUser({ payload: { email, token } }));
    });
  }

  getErrorMessageEmail() {
    const emailControl = this.loginForm.controls.email;

    if (emailControl.hasError("required")) {
      return "You must enter an email address";
    }

    if (emailControl.hasError("pattern")) {
      return "Not a valid email";
    }

    return "";
  }

  getErrorMessagePassword() {
    const passwordControl = this.loginForm.controls.password;

    if (passwordControl.hasError("required")) {
      return "You must enter a password";
    }

    if (passwordControl.hasError("minlength")) {
      return "Password must be at least 8 characters long";
    }

    if (passwordControl.hasError("maxlength")) {
      return "Maximum password length is 20 characters";
    }

    return "";
  }
}
