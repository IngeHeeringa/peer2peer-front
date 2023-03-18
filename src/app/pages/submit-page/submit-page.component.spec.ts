import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { SubmitPageComponent } from "./submit-page.component";

describe("Given a SubmitPageComponent", () => {
  describe("When rendered", () => {
    test("Then it should show the title 'New post' in a heading", async () => {
      const newPostTitle = /new post/i;

      await render(SubmitPageComponent);

      const title = screen.getByRole("heading", { name: newPostTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
