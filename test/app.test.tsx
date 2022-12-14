/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";

import { App } from "../src/app";

jest.mock("./../src/environment.ts");

describe("App", () => {
  it("should show a sign in form if not authenticated", async () => {
    fetchMock.mockResponse(`{ "isAuthenticated": false }`);
    const component = render(<App />);
    await waitFor(() => screen.getByTestId("login-form-wrapper"));
    expect(screen.getByTestId("login-form-wrapper")).toBeVisible();
    component.unmount();
  });
  it("should show a greeting if authenticated", async () => {
    fetchMock.mockResponse(
      `{ "isAuthenticated": true, "username": "testuser1" }`
    );
    const component = render(<App />);
    await waitFor(() => screen.getByTestId("greeting"));
    expect(screen.getByTestId("greeting")).toBeVisible();
    component.unmount();
  });
});
