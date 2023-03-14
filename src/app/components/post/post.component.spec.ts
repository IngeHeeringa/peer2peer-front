import { render, screen } from "@testing-library/angular";
import { PostComponent } from "./post.component";
import "@testing-library/jest-dom";

describe("Given a Post component", () => {
  const post = {
    imageUrl: "testUrl",
    projectTitle: "testProjectTitle",
    shortDescription: "testShortDescription",
    stack: "testStack",
    technologies: ["testTechnology", "testTechnology2"],
    yearsOfExperience: "testExperience",
  };
  const renderComponent = async () => {
    await render(PostComponent, {
      componentProperties: { post },
    });
  };

  describe("When rendered", () => {
    test("Then it should show an article with all the post data in it", async () => {
      await renderComponent();

      const post = screen.getByRole("article");

      expect(post).toBeInTheDocument();
    });

    test("Then it should show an image with the project title as alt text", async () => {
      const altText = post.projectTitle;

      await renderComponent();

      const image = screen.getByRole("img", { name: altText });

      expect(image).toBeInTheDocument();
      expect(image).toHaveAccessibleName(altText);
    });

    test("Then it should show the project title in a heading", async () => {
      const title = post.projectTitle;

      await renderComponent();

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
