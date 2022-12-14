import * as React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, SensorAPI } from "react-beautiful-dnd";
import { useLocation, useParams } from "react-router-dom";

import { AddSectionComponent } from "../../notes/add-section.component";
import {
  groupNotesBySection,
  NotesInSectionService,
} from "../../notes/notes-group-service";
import { NotesSection } from "../../notes/notes-section.component";
import { Note, NotesService } from "../../notes/notes-service";
import { Notebook, NotebooksService } from "../notebooks-service";
import { NotebookSidePanel } from "./notebook-side-panel";

class DragAndDropTestingSensor {
  private sensorAPI: SensorAPI;
  public setAPI(sensorAPI: SensorAPI) {
    this.sensorAPI = sensorAPI;
  }
  public moveCardDown(draggableId: string) {
    const lock = this.sensorAPI.tryGetLock(draggableId);
    const lift = lock.snapLift();
    lift.moveDown();
    lift.drop();
  }
}

export const testingSensor = new DragAndDropTestingSensor();
function testSensor(api: SensorAPI) {
  testingSensor.setAPI(api);
}

const notesInSectionService = new NotesInSectionService();

interface NotebookNotesComponentProps {
  dataTestID: string;
  wrapperClassName: string;
  columnClassName: string;
}

export function NotebookNotesComponent(
  props: NotebookNotesComponentProps
): React.ReactElement {
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
    notesInSectionService.setSections(sections);
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
    const notesService = new NotesService();
    let insertAtIndex = dropResult.destination.index;
    if (
      dropResult.source.droppableId === dropResult.destination.droppableId &&
      dropResult.source.index < insertAtIndex
    ) {
      insertAtIndex += 1;
    }
    const order = notesInSectionService.getOrderAfterInsert(
      dropResult.destination.droppableId,
      insertAtIndex
    );
    await notesService.moveNoteToSection({
      "note-id": dropResult.draggableId,
      "note-section": dropResult.destination.droppableId,
      "note-manual-order": order,
    });
    loadNotes();
  };

  useEffect(() => {
    document.body.addEventListener("click", hideSidePanel);
    return function cleanup() {
      document.body.removeEventListener("click", hideSidePanel);
    };
  });
  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);
  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div
      data-testid={props.dataTestID}
      onClick={hideSidePanel}
      className="single-page-content-wrapper"
    >
      <div className="content-block">
        {!notebook && <div>Loading...</div>}
        {notebook && (
          <DragDropContext onDragEnd={handleDrop} sensors={[testSensor]}>
            <div className={props.wrapperClassName}>
              {sections.map((x, index) => (
                <div className={props.columnClassName} key={`section-${index}`}>
                  {!x.sectionName && <h1>(untitled)</h1>}
                  <NotesSection
                    notebookID={notebook.id}
                    newNoteManualOrder={notesInSectionService.getNextOrderInSection(
                      x.sectionID
                    )}
                    section={x}
                    onNoteAdded={loadNotes}
                    onNoteSelected={(note: Note) => showSidePanel(note)}
                    key={`section-${index}`}
                  />
                </div>
              ))}
            </div>
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
