import "./notebook-board.component.css";

import React from "react";

import { NotebookNotesComponent } from "./notebook-notes.component";

export function NotebookBoardComponent(): React.ReactElement {
  return (
    <NotebookNotesComponent
      dataTestID="notebook-board-view"
      wrapperClassName="board-wrapper"
      columnClassName="board-column"
    />
  );
}
