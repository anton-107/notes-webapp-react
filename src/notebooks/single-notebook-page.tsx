import * as React from "react";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { ApplicationEventEmitter, ApplicationEvents } from "../app-events";
import { Notebook, NotebooksService } from "./notebooks-service";
import "./single-notebook-page.css";

export function SingleNotebookPage(): React.ReactElement {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [isNotebookActionsMenuOpen, setNotebookActionsMenuOpen] =
    useState<boolean>(false);
  const { notebookID } = useParams();
  const navigate = useNavigate();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };

  const openNotebookActionsMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNotebookActionsMenuOpen(true);
  };
  const hideMoreActionsMenu = () => {
    setNotebookActionsMenuOpen(false);
  };

  const deleteNotebook = async (
    notebookID: string,
    appEevents: ApplicationEventEmitter
  ) => {
    console.log("delete notebook", notebookID);
    const notebookService = new NotebooksService();
    await notebookService.deleteOne(notebookID);
    appEevents.emitEvent("notebook.deleted");
    navigate("/notebooks");
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);

  return (
    <ApplicationEvents.Consumer>
      {(appEevents) => (
        <div className="single-page-container" onClick={hideMoreActionsMenu}>
          <div>
            <div className="content-block">
              <Link to="/notebooks">← notebooks</Link>
              {notebook && (
                <div>
                  <div className="notebook-name-and-actions">
                    <h1 data-testid="notebook-name-header">{notebook.name}</h1>
                    <div className="notebook-actions-wrapper">
                      <div
                        data-testid="notebook-more-actions-dropdown-menu"
                        className={
                          isNotebookActionsMenuOpen
                            ? "dropdown-menu open"
                            : "dropdown-menu"
                        }
                      >
                        <button
                          className="simple-button dropdown-button"
                          onClick={openNotebookActionsMenu}
                          data-testid="notebook-more-actions-menu-button"
                        >
                          <span className="material-symbols-outlined">
                            more_horiz
                          </span>
                        </button>
                        <div className="dropdown-content dropdown-content-notebook-actions">
                          <ul className="actions-list">
                            <li className="warning-action">
                              <a
                                href="#"
                                onClick={() =>
                                  deleteNotebook(notebook.id, appEevents)
                                }
                                data-testid={`action-delete-notebook-${notebook.id}`}
                              >
                                Delete this notebook
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

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
      )}
    </ApplicationEvents.Consumer>
  );
}
