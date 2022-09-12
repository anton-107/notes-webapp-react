import * as React from "react";
import { Note } from "./notes-service";

interface NotesListProperties {
  notes: Note[];
  onNoteSelected: (note: Note) => void;
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  const selectNote = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    note: Note
  ) => {
    e.preventDefault();
    e.stopPropagation();
    props.onNoteSelected(note);
  };

  return (
    <div>
      {props.notes.map((n: Note) => {
        return (
          <div data-testid={`note-${n.id}`} key={`note-${n.id}`}>
            <div className="note-item">
              <div
                className="note-content"
                onClick={(e) => selectNote(e, n)}
                data-testid={`note-content-${n.id}`}
              >
                {n.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
