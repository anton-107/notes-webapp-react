import * as React from "react";
import { useNavigate } from "react-router-dom";

import { ApplicationEventEmitter } from "../app-events";
import { Notebook, NotebooksService } from "./notebooks-service";

interface SingleNotebookPageHeaderComponentProperties {
  notebook: Notebook;
  appEevents: ApplicationEventEmitter;
  isNotebookActionsMenuOpen: boolean;
  openNotebookActionsMenu: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export function SingleNotebookPageHeaderComponent(
  props: SingleNotebookPageHeaderComponentProperties
): React.ReactElement {
  const navigate = useNavigate();

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

  return (
    <div className="notebook-name-and-actions">
      <h1 data-testid="notebook-name-header">{props.notebook.name}</h1>
      <div className="notebook-actions-wrapper">
        <div
          data-testid="notebook-more-actions-dropdown-menu"
          className={
            props.isNotebookActionsMenuOpen
              ? "dropdown-menu open"
              : "dropdown-menu"
          }
        >
          <button
            className="simple-button dropdown-button"
            onClick={props.openNotebookActionsMenu}
            data-testid="notebook-more-actions-menu-button"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
          <div className="dropdown-content dropdown-content-notebook-actions">
            <ul className="actions-list">
              <li className="warning-action">
                <a
                  href="#"
                  onClick={() =>
                    deleteNotebook(props.notebook.id, props.appEevents)
                  }
                  data-testid={`action-delete-notebook-${props.notebook.id}`}
                >
                  Delete this notebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
