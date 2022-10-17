/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PeoplePage } from "../../src/people/people-page";
import { BrowserRouter } from "react-router-dom";

describe("People page", () => {
  beforeAll(() => {
    fetchMock.mockResponse(
      JSON.stringify({
        people: [
          { name: "Justin Case", email: "justin@mymail.com", id: "person-1" },
          {
            name: "Francesco DiLivio",
            email: "francesco@mymail.com",
            id: "person-2",
          },
        ],
      })
    );
  });
  it("should show list of people", async () => {
    const component = render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("People");
    await waitFor(() => screen.getByTestId("person-person-1"));
    expect(screen.getByTestId("person-person-1")).toHaveTextContent(
      "Justin Case"
    );
    expect(screen.getByTestId("person-person-2")).toHaveTextContent(
      "Francesco DiLivio"
    );
    component.unmount();
  });
  it("should delete a person", async () => {
    const component = render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );
    await waitFor(() =>
      screen.getByTestId("person-actions-menu-button-person-2")
    );
    fireEvent.click(screen.getByTestId("person-actions-menu-button-person-2"));
    fireEvent.click(screen.getByTestId("people-page-container"));
    fireEvent.click(screen.getByTestId("person-actions-menu-button-person-2"));
    await waitFor(() => screen.getByTestId("action-delete-person-person-2"));
    fireEvent.click(screen.getByTestId("action-delete-person-person-2"));
    component.unmount();
  });
});
