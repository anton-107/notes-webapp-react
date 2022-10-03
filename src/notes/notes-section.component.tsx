import * as React from "react";
import { AddPlaintextNoteComponent } from "./add-plaintext-note.component";
import { NotesList } from "./notes-list";
import { Note } from "./notes-service";
import { Droppable } from "react-beautiful-dnd";
import { NotesInSection } from "./notes-group-service";

interface NotesSectionProperties {
  notebookID: string;
  newNoteManualOrder: number;
  section: NotesInSection;
  onNoteSelected: (note: Note) => void;
  onNoteAdded: () => void;
}
export function NotesSection(
  props: NotesSectionProperties
): React.ReactElement {
  return (
    <div>
      <h1 data-testid={`section-${props.section.sectionID}`}>
        {props.section.sectionName}
      </h1>
      <Droppable droppableId={props.section.sectionID}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <NotesList
              notes={props.section.notes}
              onNoteSelected={props.onNoteSelected}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddPlaintextNoteComponent
        newNoteManualOrder={props.newNoteManualOrder}
        notebookID={props.notebookID}
        onNoteAdded={props.onNoteAdded}
        sectionID={props.section.sectionID}
      />
    </div>
  );
}