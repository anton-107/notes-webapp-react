import * as React from "react";
import { create } from "react-test-renderer";
import { App } from "../src/app";
import fetchMock from "jest-fetch-mock";

describe("App", () => {
  it("should match a snapshot", () => {
    fetchMock.mockResponse(`{ "isAuthenticated": false }`);
    const component = create(<App name="anonymous" />);
    const tree = component.toTree();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });
});
