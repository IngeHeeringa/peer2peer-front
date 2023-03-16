import { MaxSizeValidator } from "@angular-material-components/file-input";
import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent {
  stack = [
    { value: "frontEnd", viewValue: "Front End" },
    { value: "backEnd", viewValue: "Back End" },
    { value: "fullStack", viewValue: "Full Stack" },
  ];

  technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Firebase",
    "AWS",
    "Azure",
    "Docker",
  ];

  postForm = this.fb.group({
    projectTitle: ["", [Validators.required]],
    shortDescription: ["", [Validators.required]],
    fullDescription: ["", [Validators.required]],
    stack: [[], [Validators.required]],
    technologies: [[], [Validators.required]],
    yearsOfExperience: ["", [Validators.required]],
    image: [File, Validators.required],
  });

  constructor(@Inject(FormBuilder) private readonly fb: FormBuilder) {}
}
