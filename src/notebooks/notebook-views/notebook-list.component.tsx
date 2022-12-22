import React from "react";

import { NotebookNotesComponent } from "./notebook-notes.component";

export function NotebookListComponent(): React.ReactElement {
  return (
    <NotebookNotesComponent
      dataTestID="notebook-list-view"
      wrapperClassName="list-wrapper"
      columnClassName="list-column"
    />
  );
}
