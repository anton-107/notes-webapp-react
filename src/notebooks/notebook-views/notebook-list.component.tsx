import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddSectionComponent } from "../../notes/add-section.component";
import { groupNotesBySection } from "../../notes/notes-group-service";
import { NotesSection } from "../../notes/notes-section.component";
import { Note, NotesService } from "../../notes/notes-service";
import { Notebook, NotebooksService } from "../notebooks-service";
import { NotebookSidePanel } from "./notebook-side-panel";
import { DragDropContext } from "react-beautiful-dnd";

export function handleDrop(): void {
  return null;
}

export function NotebookListComponent(): React.ReactElement {
  const location = useLocation();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sections, setSections] = useState([]);
  const { notebookID } = useParams();
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    const sections = groupNotesBySection(notes);
    setSections(sections);
  };

  const showSidePanel = (note: Note) => {
    setSelectedNote(note);
    setSidePanelVisible(true);
  };

  const hideSidePanel = () => {
    setSidePanelVisible(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", hideSidePanel);
  });
  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);
  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div
      data-testid="notebook-list-view"
      onClick={hideSidePanel}
      className="single-page-content-wrapper"
    >
      <div className="content-block">
        {!notebook && <div>Loading...</div>}
        {notebook && (
          <DragDropContext onDragEnd={handleDrop}>
            {sections.map((x) => (
              <NotesSection
                notebookID={notebook.id}
                newNoteManualOrder={100}
                section={x}
                onNoteAdded={loadNotes}
                onNoteSelected={(note: Note) => showSidePanel(note)}
              />
            ))}
          </DragDropContext>
        )}
      </div>
      <div className="content-block">
        {notebook && (
          <AddSectionComponent
            notebookID={notebook.id}
            onSectionAdded={loadNotes}
          />
        )}
      </div>
      <NotebookSidePanel
        isVisible={isSidePanelVisible}
        selectedNote={selectedNote}
        onNoteDeleted={() => {
          hideSidePanel();
          loadNotes();
        }}
        onNoteEdited={loadNotes}
      />
    </div>
  );
}
