import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddSectionComponent } from "../../notes/add-section.component";
import {
  NotesInSection,
  NotesSection,
} from "../../notes/notes-section.component";
import { Note, NotesService } from "../../notes/notes-service";
import { Notebook, NotebooksService } from "../notebooks-service";
import { NotebookSidePanel } from "./notebook-side-panel";

function groupNotesBySection(notes: Note[]): NotesInSection[] {
  const r = [];
  const sectionsByID: { [key: string]: NotesInSection } = {};
  const untitledSection: NotesInSection = {
    sectionName: null,
    sectionID: null,
    notes: [],
  };
  r.push(untitledSection);

  const sections = notes.filter(
    (x) => x.type && x.type.type === "notes-container"
  );

  sections.forEach((x) => {
    const section: NotesInSection = {
      sectionName: x.content,
      sectionID: x.id,
      notes: [],
    };
    r.push(section);
    sectionsByID[x.id] = section;
  });

  notes.forEach((x) => {
    if (!x.type || x.type.type !== "notes-container") {
      if (x.extensionProperties && x.extensionProperties.section) {
        sectionsByID[x.extensionProperties.section].notes.push(x);
      } else {
        untitledSection.notes.push(x);
      }
    }
  });

  return r;
}

export function NotebookListComponent(): React.ReactElement {
  const location = useLocation();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sections, setSections] = useState([]);
  const { notebookID } = useParams();
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotebook = async (notebookID: string) => {
    console.log("load notebook from component", notebookID);
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
        {notebook &&
          sections.map((x) => (
            <NotesSection
              notebookID={notebook.id}
              section={x}
              onNoteAdded={loadNotes}
              onNoteSelected={(note: Note) => showSidePanel(note)}
            />
          ))}
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
