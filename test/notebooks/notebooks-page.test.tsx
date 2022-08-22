/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { NotebooksPage } from "./../../src/notebooks/notebooks-page";

describe("Notebooks page", () => {
  it("should show notebooks page header", () => {
    render(<NotebooksPage />);
    expect(screen.getByRole("heading")).toHaveTextContent("Notebooks page");
  });
});
