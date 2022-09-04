import * as React from "react";
import { Note } from "./notes-service";

interface NotesListProperties {
  notes: Note[];
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  return (
    <div>
      {props.notes.map((n: Note) => {
        return (
          <div data-testid={`note-${n.id}`} key={`note-${n.id}`}>
            <div className="note-item">
              <div className="note-content">{n.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
