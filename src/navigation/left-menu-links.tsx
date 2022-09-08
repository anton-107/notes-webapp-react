import * as React from "react";
import { NavLink } from "react-router-dom";

export function LeftMenuLinks(): React.ReactElement {
  return (
    <ul className="menu-links">
      <li>
        <NavLink
          to="/notebooks"
          data-testid="notebooks-page-link"
          className={({ isActive }) => (isActive ? "active-nav-link" : "")}
        >
          Notebooks
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/people"
          data-testid="people-page-link"
          className={({ isActive }) => (isActive ? "active-nav-link" : "")}
        >
          People
        </NavLink>
      </li>
    </ul>
  );
}
