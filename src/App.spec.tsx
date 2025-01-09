import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("Renders App", () => {
  it("Renders App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
