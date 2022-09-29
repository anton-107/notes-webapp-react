import { NotesInSection } from "./notes-section.component";
import { Note } from "./notes-service";

export function groupNotesBySection(notes: Note[]): NotesInSection[] {
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
        if (
          sectionsByID[x.extensionProperties.section] &&
          sectionsByID[x.extensionProperties.section].notes
        ) {
          sectionsByID[x.extensionProperties.section].notes.push(x);
        } else {
          console.warn("Moving note to an untitled section", x);
          untitledSection.notes.push(x);
        }
      } else {
        untitledSection.notes.push(x);
      }
    }
  });

  return r;
}
