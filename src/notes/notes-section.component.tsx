import * as React from "react";
import { AddPlaintextNoteComponent } from "./add-plaintext-note.component";
import { NotesList } from "./notes-list";
import { Note } from "./notes-service";

export interface NotesInSection {
  sectionName: string | null;
  sectionID: string | null;
  notes: Note[];
}

interface NotesSectionProperties {
  notebookID: string;
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
      <NotesList
        notes={props.section.notes}
        onNoteSelected={props.onNoteSelected}
      />
      <AddPlaintextNoteComponent
        notebookID={props.notebookID}
        onNoteAdded={props.onNoteAdded}
        sectionID={props.section.sectionID}
      />
    </div>
  );
}
