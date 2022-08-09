import * as React from "react";
import { create } from "react-test-renderer";
import { App } from "../src/app";

describe("App", () => {
  it("should match a snapshot", () => {
    const component = create(<App name="anonymous" />);
    const tree = component.toTree();
    expect(tree).toMatchSnapshot();
  });
});
