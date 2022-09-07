import * as React from "react";
import { Note, NotesService } from "./notes-service";

interface NotesListProperties {
  notes: Note[];
  onNoteDeleted: (noteID: string) => void;
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  const deleteNote = async (noteID: string) => {
    const notesService = new NotesService();
    await notesService.deleteNote(noteID);
    props.onNoteDeleted(noteID);
  };

  return (
    <div>
      {props.notes.map((n: Note) => {
        return (
          <div data-testid={`note-${n.id}`} key={`note-${n.id}`}>
            <div className="note-item">
              <div className="note-content">{n.content}</div>
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
