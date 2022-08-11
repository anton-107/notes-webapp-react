/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { LoginForm } from "../../src/auth/login-form";

describe("Login form", () => {
  it("should submit login and password", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("user-login"), {
      target: { value: "user1" },
    });
    fireEvent.change(screen.getByTestId("user-password"), {
      target: { value: "testpassword" },
    });
    fireEvent.submit(screen.getByTestId("login-form"));

    expect(screen.getByTestId("user-login")).toHaveProperty("value", "user1");
    expect(screen.getByTestId("user-password")).toHaveProperty(
      "value",
      "testpassword"
    );
  });
});
