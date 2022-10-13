/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { PeoplePage } from "../../src/people/people-page";

describe("People page", () => {
  it("should show people page header", () => {
    render(<PeoplePage />);
    expect(screen.getByRole("heading")).toHaveTextContent("People");
  });
});
