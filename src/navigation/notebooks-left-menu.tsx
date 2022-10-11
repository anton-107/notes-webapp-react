import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ApplicationEventEmitter } from "../app-events";
import { Notebook, NotebooksService } from "../notebooks/notebooks-service";

interface NotebooksLeftMenuProperties {
  applicationEvents: ApplicationEventEmitter;
}

export function NotebooksLeftMenu(
  props: NotebooksLeftMenuProperties
): React.ReactElement {
  const [notebooks, setNotebooks] = useState([]);

  const loadNotebooks = async () => {
    const notebooksService = new NotebooksService();
    const notebooks = await notebooksService.listAll();
    setNotebooks(notebooks);
  };

  useEffect(() => {
    loadNotebooks();
  }, []);

  useEffect(() => {
    props.applicationEvents.addListener("notebook.deleted", loadNotebooks);
    props.applicationEvents.addListener("notebook.added", loadNotebooks);
    return function cleanup() {
      props.applicationEvents.removeListener("notebook.deleted", loadNotebooks);
      props.applicationEvents.removeListener("notebook.added", loadNotebooks);
    };
  });

  return (
    <div>
      {notebooks.length > 1 && (
        <div>
          <h2 className="menu-block menu-header">Recent notebooks</h2>
          <ul className="menu-links">
            {notebooks.map((n: Notebook) => {
              return (
                <li key={`notebook-${n.id}`}>
                  <NavLink
                    to={`/notebook/${n.id}`}
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    data-testid={`notebook-${n.id}`}
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
