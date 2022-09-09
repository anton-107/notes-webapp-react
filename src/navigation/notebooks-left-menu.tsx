import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Notebook, NotebooksService } from "../notebooks/notebooks-service";

export function NotebooksLeftMenu(): React.ReactElement {
  const [notebooks, setNotebooks] = useState([]);

  const loadNotebooks = async () => {
    const notebooksService = new NotebooksService();
    const notebooks = await notebooksService.listAll();
    setNotebooks(notebooks);
  };

  useEffect(() => {
    loadNotebooks();
  }, []);

  return (
    <div>
      {notebooks.length > 1 && (
        <div>
          <h2 className="menu-block menu-header">Recent notebooks</h2>
          <ul className="menu-links">
            {notebooks.map((n: Notebook) => {
              return (
                <li data-testid={`notebook-${n.id}`} key={`notebook-${n.id}`}>
                  <NavLink
                    to={`/notebook/${n.id}`}
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                  >
                    {n.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
