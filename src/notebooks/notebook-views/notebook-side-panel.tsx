import * as React from "react";

import { NoteDetails } from "../../notes/note-details";
import { Note } from "../../notes/notes-service";

interface NotebookSidePanelProps {
  isVisible: boolean;
  selectedNote: Note;
  onNoteDeleted: () => void;
  onNoteEdited: () => void;
}

export function NotebookSidePanel(
  props: NotebookSidePanelProps
): React.ReactElement {
  return (
    <div
      data-testid="single-notebook-page-sidepanel"
      className={props.isVisible ? "side-panel visible" : "side-panel hidden"}
      onClick={(e) => e.stopPropagation()}
    >
      {props.selectedNote && (
        <NoteDetails
          note={props.selectedNote}
          onNoteDeleted={props.onNoteDeleted}
          onNoteEdited={props.onNoteEdited}
        />
      )}
    </div>
  );
}
