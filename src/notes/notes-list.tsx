import * as React from "react";
import { Note, NotesService } from "./notes-service";

interface NotesListProperties {
  notes: Note[];
  onNoteDeleted: (noteID: string) => void;
  onNoteSelected: (note: Note) => void;
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  const deleteNote = async (noteID: string) => {
    const notesService = new NotesService();
    await notesService.deleteNote(noteID);
    props.onNoteDeleted(noteID);
  };
  const selectNote = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    note: Note
  ) => {
    e.preventDefault();
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
              <div className="note-actions">
                <a
                  href="#"
                  onClick={() => deleteNote(n.id)}
                  data-testid={`delete-note-link-${n.id}`}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
