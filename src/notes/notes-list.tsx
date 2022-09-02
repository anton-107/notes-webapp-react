import * as React from "react";
import { useEffect, useState } from "react";
import { Note, NotesService } from "./notes-service";

interface NotesListProperties {
  notebookID: string;
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(props.notebookID);
    setNotes(notes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      {notes.map((n: Note) => {
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
