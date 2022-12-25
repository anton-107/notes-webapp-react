/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";

import { UserMenu } from "../../src/auth/user-menu";

jest.mock("./../../src/environment.ts");

describe("Login form", () => {
  it("should show user greeting and signout", () => {
    const onSignOut = () => {
      // this is intentionally empty
    };

    fetchMock.mockResponse(`<div>You are now signed out</div>`);
    render(<UserMenu userName="user1" onSignOut={onSignOut} />);
    expect(screen.getByTestId("user-menu-greeting")).toHaveTextContent(
      "Signed in as user1."
    );
    fireEvent.click(screen.getByTestId("signout-link"));
  });
});
