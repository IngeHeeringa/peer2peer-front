import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";
import { type UserRegisterData } from "../../types";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
  registerForm = this.fb.group({
    username: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_]+$"),
        Validators.minLength(3),
        Validators.maxLength(12),
      ],
    ],
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
    @Inject(FormBuilder) private readonly fb: FormBuilder,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const registerData = this.registerForm.value as UserRegisterData;

    this.userService.register(registerData).subscribe(async (data) => {
      this.uiService.hideLoading();
      this.uiService.showSuccessModal("Your account has been created");
      this.uiService.redirectUser("");
    });
  }
}
