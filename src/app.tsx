import * as React from "react";
import "./main.css";

export function App(props: { name: string }): React.ReactElement {
  return (
    <div id="app-root">
      <div className="layout">
        <div className="vertical-menu">
          <h1 className="menu-block menu-header">Notes app</h1>
          <ul className="menu-links">
            <li>
              <a href="#">Notebooks</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="content-block">Hello {props.name}</div>
        </div>
      </div>
    </div>
  );
}
