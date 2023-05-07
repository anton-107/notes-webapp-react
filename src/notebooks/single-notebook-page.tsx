import "./single-notebook-page.css";

import * as React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

import { ApplicationEvents } from "../app-events";
import { Notebook, NotebooksService } from "./notebooks-service";
import { SingleNotebookPageHeaderComponent } from "./single-notebook-page-header.component";

export function SingleNotebookPage(): React.ReactElement {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };
  const [isNotebookActionsMenuOpen, setNotebookActionsMenuOpen] =
    React.useState<boolean>(false);

  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);

  const openNotebookActionsMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNotebookActionsMenuOpen(true);
  };
  const hideMoreActionsMenu = () => {
    setNotebookActionsMenuOpen(false);
  };

  return (
    <ApplicationEvents.Consumer>
      {(appEevents) => (
        <div className="single-page-container" onClick={hideMoreActionsMenu}>
          <div>
            <div className="content-block">
              <Link to="/notebooks">← notebooks</Link>
              {notebook && (
                <div>
                  <SingleNotebookPageHeaderComponent
                    notebook={notebook}
                    appEevents={appEevents}
                    isNotebookActionsMenuOpen={isNotebookActionsMenuOpen}
                    openNotebookActionsMenu={openNotebookActionsMenu}
                  />

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
                    <li>
                      <NavLink
                        data-testid="notebook-table-link"
                        to={`table`}
                        className={({ isActive }) =>
                          isActive ? "active-nav-link" : ""
                        }
                      >
                        Table
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        data-testid="notebook-filetree-link"
                        to={`file-tree`}
                        className={({ isActive }) =>
                          isActive ? "active-nav-link" : ""
                        }
                      >
                        File tree
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </ApplicationEvents.Consumer>
  );
}
