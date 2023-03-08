import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  emailFormControl = new FormControl();
  passwordFormControl = new FormControl();
}
