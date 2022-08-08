import * as React from "react";

export function App(props: { name: string }): React.ReactElement {
  return <h1>Hello, {props.name}</h1>;
}
