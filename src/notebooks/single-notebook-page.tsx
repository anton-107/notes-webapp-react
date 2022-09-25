import * as React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Notebook, NotebooksService } from "./notebooks-service";
import "./single-notebook-page.css";

export function SingleNotebookPage(): React.ReactElement {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);

  return (
    <div className="single-page-container">
      <div>
        <div className="content-block">
          <Link to="/notebooks">← notebooks</Link>
          {notebook && (
            <div>
              <h1 data-testid="notebook-name-header">{notebook.name}</h1>
              <ul className="notebook-horizontal-menu">
                <li>
                  <NavLink
                    data-testid="notebook-overview-link"
                    to={``}
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                    end
                  >
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    data-testid="notebook-list-link"
                    to={`list`}
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                  >
                    List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    data-testid="notebook-board-link"
                    to={`board`}
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : ""
                    }
                  >
                    Board
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
