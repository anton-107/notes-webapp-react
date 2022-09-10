import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AddPlaintextNoteComponent } from "../notes/add-plaintext-note.component";
import { NotesList } from "../notes/notes-list";
import { Note, NotesService } from "../notes/notes-service";
import { Notebook, NotebooksService } from "./notebooks-service";
import "./single-notebook-page.css";

export function SingleNotebookPage(): React.ReactElement {
  const location = useLocation();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [notes, setNotes] = useState([]);
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
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

  const showSidePanel = (note: Note) => {
    setSelectedNote(note);
    setSidePanelVisible(true);
  };

  const hideSidePanel = () => {
    setSidePanelVisible(false);
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);
  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div className="single-page-container">
      <div
        className="content-block"
        onClick={hideSidePanel}
        data-testid="single-notebook-page-content-wrapper"
      >
        <Link to="/notebooks">← notebooks</Link>
        {!notebook && <div>Loading...</div>}
        {notebook && (
          <h1 data-testid="notebook-name-header">{notebook.name}</h1>
        )}
      </div>
      <div className="content-block">
        {notebook && (
          <NotesList
            notes={notes}
            onNoteDeleted={loadNotes}
            onNoteSelected={(note: Note) => showSidePanel(note)}
          />
        )}
      </div>
      <div className="content-block">
        {notebook && (
          <AddPlaintextNoteComponent
            notebookID={notebook.id}
            onNoteAdded={loadNotes}
          />
        )}
      </div>
      <div
        data-testid="single-notebook-page-sidepanel"
        className={
          isSidePanelVisible ? "side-panel visible" : "side-panel hidden"
        }
      >
        {selectedNote && (
          <div className="content-block">
            <h2>{selectedNote.content}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
