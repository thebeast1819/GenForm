import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders JSON editor and form preview", () => {
  render(<App />);
  expect(screen.getByText(/form preview/i)).toBeInTheDocument();
  expect(screen.getByText(/json editor/i)).toBeInTheDocument();
});
