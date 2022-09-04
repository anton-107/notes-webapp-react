import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddPlaintextNoteComponent } from "../notes/add-plaintext-note.component";
import { NotesList } from "../notes/notes-list";
import { NotesService } from "../notes/notes-service";
import { Notebook, NotebooksService } from "./notebooks-service";

export function SingleNotebookPage(): React.ReactElement {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [notes, setNotes] = useState([]);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    setNotes(notes);
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, []);
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <div className="content-block">
        <Link to="/notebooks">← notebooks</Link>
        {!notebook && <div>Loading...</div>}
        {notebook && (
          <h1 data-testid="notebook-name-header">{notebook.name}</h1>
        )}
      </div>
      <div className="content-block">
        {notebook && <NotesList notes={notes} />}
      </div>
      <div className="content-block">
        {notebook && (
          <AddPlaintextNoteComponent
            notebookID={notebook.id}
            onNoteAdded={loadNotes}
          />
        )}
      </div>
    </div>
  );
}
