import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { groupNotesBySection } from "../../notes/notes-group-service";
import {
  NotesInSection,
  NotesSection,
} from "../../notes/notes-section.component";
import { Note, NotesService } from "../../notes/notes-service";
import { Notebook, NotebooksService } from "../notebooks-service";
import { NotebookSidePanel } from "./notebook-side-panel";
import "./notebook-board.component.css";
import { DragDropContext, DropResult, SensorAPI } from "react-beautiful-dnd";

class DragAndDropTestingSensor {
  private sensorAPI: SensorAPI;
  public setAPI(sensorAPI: SensorAPI) {
    this.sensorAPI = sensorAPI;
  }
  public moveCard(draggableId: string) {
    const lock = this.sensorAPI.tryGetLock(draggableId);
    const lift = lock.snapLift();
    lift.moveRight();
    lift.drop();
  }
}

export const testingSensor = new DragAndDropTestingSensor();
function testSensor(api: SensorAPI) {
  testingSensor.setAPI(api);
}

export function NotebookBoardComponent(): React.ReactElement {
  const location = useLocation();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sections, setSections] = useState<NotesInSection[]>([]);
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

  const handleDrop = async (dropResult: DropResult): Promise<void> => {
    console.log("handleDrop", dropResult);
    const notesService = new NotesService();
    await notesService.moveNoteToSection({
      "note-id": dropResult.draggableId,
      "note-section": dropResult.destination.droppableId,
    });
    loadNotes();
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
      data-testid="notebook-board-view"
      onClick={hideSidePanel}
      className="single-page-content-wrapper"
    >
      <div className="content-block">
        {!notebook && <div>Loading...</div>}
        {notebook && (
          <DragDropContext onDragEnd={handleDrop} sensors={[testSensor]}>
            <div className="board-wrapper">
              {sections.map((x, index) => (
                <div className="board-column" key={`section-${index}`}>
                  {!x.sectionName && <h1>(untitled)</h1>}
                  <NotesSection
                    notebookID={notebook.id}
                    section={x}
                    onNoteAdded={loadNotes}
                    onNoteSelected={(note: Note) => showSidePanel(note)}
                  />
                </div>
              ))}
            </div>
          </DragDropContext>
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
