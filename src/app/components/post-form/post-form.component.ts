import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../../services/posts/posts.service";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent {
  stack = [
    { value: "Front End", viewValue: "Front End" },
    { value: "Back End", viewValue: "Back End" },
    { value: "Full Stack", viewValue: "Full Stack" },
  ];

  technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Angular",
    "Vue",
    "Astro",
    "Svelte",
    "Node.js",
    "Express.js",
    "MongoDB",
    "C++",
    "C#",
    "Python",
    "Go",
    "Java",
    "PHP",
    "Firebase",
    "AWS",
    "Azure",
    "Docker",
  ];

  postForm = this.fb.group({
    projectTitle: ["", [Validators.required, Validators.maxLength(25)]],
    shortDescription: ["", [Validators.required, Validators.maxLength(30)]],
    fullDescription: ["", [Validators.required, Validators.maxLength(200)]],
    stack: ["", [Validators.required]],
    technologies: [[], [Validators.required, Validators.min(1)]],
    yearsOfExperience: ["<1 year", [Validators.required]],
    image: [null],
  });

  constructor(
    @Inject(FormBuilder) private readonly fb: FormBuilder,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(PostsService) private readonly postsService: PostsService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const { username, sub } = this.userService.checkUser();

    const formData = new FormData();

    Object.keys(this.postForm.controls).forEach((formControlName) => {
      formData.append(
        formControlName,
        this.postForm.get(formControlName)?.value as string
      );
    });

    formData.append("creator", username);
    formData.append("id", sub!);

    this.postsService.submitPost(formData).subscribe(async (data) => {
      this.uiService.hideLoading();
      this.uiService.showSuccessModal("Your post has been submitted");
      this.uiService.redirectUser("");
    });
  }
}
