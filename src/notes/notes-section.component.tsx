import * as React from "react";
import { NotesList } from "./notes-list";
import { Note } from "./notes-service";

export interface NotesInSection {
  sectionName: string | null;
  sectionID: string | null;
  notes: Note[];
}

interface NotesSectionProperties {
  section: NotesInSection;
  onNoteSelected: (note: Note) => void;
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
    </div>
  );
}
