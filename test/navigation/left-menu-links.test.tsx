/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { LeftMenuLinks } from "../../src/navigation/left-menu-links";
import { MemoryRouter } from "react-router-dom";

describe("Left menu links component", () => {
  it("should highlight notebooks menu item", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/notebooks"]}>
        <LeftMenuLinks />
      </MemoryRouter>
    );

    expect(screen.getByTestId("notebooks-page-link")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
  it("should highlight people menu item", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/people"]}>
        <LeftMenuLinks />
      </MemoryRouter>
    );

    expect(screen.getByTestId("people-page-link")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
});
