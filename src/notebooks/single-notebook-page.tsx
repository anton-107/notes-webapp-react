import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AddSectionComponent } from "../notes/add-section.component";
import { NoteDetails } from "../notes/note-details";
import { NotesInSection, NotesSection } from "../notes/notes-section.component";
import { Note, NotesService } from "../notes/notes-service";
import { Notebook, NotebooksService } from "./notebooks-service";
import "./single-notebook-page.css";

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

export function SingleNotebookPage(): React.ReactElement {
  const location = useLocation();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sections, setSections] = useState([]);
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
    loadNotebook(notebookID);
  }, [location]);
  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div className="single-page-container">
      <div
        className="single-page-content-wrapper"
        onClick={hideSidePanel}
        data-testid="single-notebook-page-content-wrapper"
      >
        <div className="content-block">
          <Link to="/notebooks">← notebooks</Link>
          {!notebook && <div>Loading...</div>}
          {notebook && (
            <h1 data-testid="notebook-name-header">{notebook.name}</h1>
          )}
        </div>
        <div className="content-block">
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
      </div>
      <div
        data-testid="single-notebook-page-sidepanel"
        className={
          isSidePanelVisible ? "side-panel visible" : "side-panel hidden"
        }
      >
        {selectedNote && (
          <NoteDetails
            note={selectedNote}
            onNoteDeleted={() => {
              hideSidePanel();
              loadNotes();
            }}
            onNoteEdited={loadNotes}
          />
        )}
      </div>
    </div>
  );
}
