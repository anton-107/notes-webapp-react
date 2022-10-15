/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { PeoplePage } from "../../src/people/people-page";
import { BrowserRouter } from "react-router-dom";

describe("People page", () => {
  it("should show list of people", async () => {
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
});
