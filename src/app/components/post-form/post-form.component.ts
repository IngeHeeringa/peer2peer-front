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
    projectTitle: ["", [Validators.required, Validators.maxLength(15)]],
    shortDescription: ["", [Validators.required, Validators.maxLength(20)]],
    fullDescription: ["", [Validators.required, Validators.maxLength(200)]],
    stack: [[], [Validators.required]],
    technologies: [[], [Validators.required, Validators.min(1)]],
    yearsOfExperience: ["1", [Validators.required]],
    image: [undefined, [Validators.required]],
  });

  constructor(@Inject(FormBuilder) private readonly fb: FormBuilder) {}
}
