/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { AddPersonComponent } from "../../src/people/add-person.component";

describe("Add person component", () => {
  it("should show and hide form", async () => {
    const onPersonAddedMock = jest.fn();

    const component = render(
      <BrowserRouter>
        <AddPersonComponent onPersonAdded={onPersonAddedMock} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-person-button"));
    await waitFor(() => screen.getByTestId("add-person-name-input"));
    fireEvent.click(screen.getByTestId("adding-person-cancel-button"));
    await waitFor(() => screen.getByTestId("add-person-button"));
    component.unmount();
  });
  it("should submit form for person creation", async () => {
    fetchMock.mockResponse(`{ "id": "test-person-id" }`);
    const onPersonAddedMock = jest.fn();

    const component = render(
      <BrowserRouter>
        <AddPersonComponent onPersonAdded={onPersonAddedMock} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-person-button"));
    await waitFor(() => screen.getByTestId("add-person-name-input"));
    fireEvent.change(screen.getByTestId("add-person-name-input"), {
      target: { value: "Justin Case" },
    });
    fireEvent.change(screen.getByTestId("add-person-email-input"), {
      target: { value: "justin@mymail.com" },
    });
    fireEvent.submit(screen.getByTestId("add-person-form"));
    await waitFor(() => expect(onPersonAddedMock).toHaveBeenCalledTimes(1));
    component.unmount();
  });
});
