import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Note, NotesService } from "../../notes/notes-service";

export function NotebookTableComponent(): React.ReactElement {
  const [notes, setNotes] = useState<Note[]>([]);
  const { notebookID } = useParams();

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    setNotes(notes);
  };
  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div className="content-block" data-testid="notebook-table-view">
      <table className="data-table">
        <thead>
          <tr>
            <th>Note</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n) => (
            <tr data-testid={`note-row-${n.id}`}>
              <td>{n.content}</td>
              <td>{n.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
