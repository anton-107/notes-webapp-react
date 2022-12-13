import { Note } from "./notes-service";

export interface NotesInSection {
  sectionName: string | null;
  sectionID: string | null;
  notes: Note[];
}

export function groupNotesBySection(notes: Note[]): NotesInSection[] {
  const r = [];
  const sectionsByID: { [key: string]: NotesInSection } = {};
  const untitledSection: NotesInSection = {
    sectionName: null,
    sectionID: "<empty-section>",
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
          untitledSection.notes.push(x);
        }
      } else {
        untitledSection.notes.push(x);
      }
    }
  });

  // sort notes by manual order:
  r.forEach((section) => {
    section.notes.sort((a, b) => {
      const aOrder = a.extensionProperties
        ? a.extensionProperties.manualOrder || 1
        : 1;
      const bOrder = b.extensionProperties
        ? b.extensionProperties.manualOrder || 2
        : 2;
      return aOrder - bOrder;
    });
  });

  return r;
}

export class NotesInSectionService {
  private sections: NotesInSection[] = [];
  private STEP = 100;

  public setSections(sections: NotesInSection[]): void {
    this.sections = sections;
  }
  public getOrderAfterInsert(
    sectionID: string,
    insertedAtIndex: number
  ): number | null {
    const section = this.sections.find((x) => x.sectionID === sectionID);
    if (!section) {
      return null;
    }
    if (section.notes.length === 0) {
      return this.STEP;
    }
    if (insertedAtIndex === 0) {
      const firstNoteOrder = section.notes[0].extensionProperties
        ? section.notes[0].extensionProperties.manualOrder
        : null;
      if (typeof firstNoteOrder !== "number") {
        return this.STEP;
      }
      return firstNoteOrder / 2;
    }
    if (insertedAtIndex >= section.notes.length) {
      const lastNoteOrder = section.notes[section.notes.length - 1]
        .extensionProperties
        ? section.notes[section.notes.length - 1].extensionProperties
            .manualOrder
        : null;
      if (typeof lastNoteOrder !== "number") {
        return this.STEP;
      }
      return lastNoteOrder + this.STEP;
    }
    const cardBeforeOrder = section.notes[insertedAtIndex - 1]
      .extensionProperties
      ? section.notes[insertedAtIndex - 1].extensionProperties.manualOrder
      : null;
    const cardAfterOrder = section.notes[insertedAtIndex].extensionProperties
      ? section.notes[insertedAtIndex].extensionProperties.manualOrder
      : null;
    if (
      typeof cardBeforeOrder !== "number" ||
      typeof cardAfterOrder !== "number"
    ) {
      return this.STEP;
    }

    return Math.abs((cardAfterOrder + cardBeforeOrder) / 2);
  }
  public getNextOrderInSection(sectionID: string): number {
    const section = this.sections.find((x) => x.sectionID === sectionID);
    if (!section) {
      return this.STEP;
    }
    if (section.notes.length === 0) {
      return this.STEP;
    }
    const lastNote = section.notes[section.notes.length - 1];
    if (!lastNote.extensionProperties) {
      return this.STEP;
    }
    if (!lastNote.extensionProperties.manualOrder) {
      return this.STEP;
    }
    return lastNote.extensionProperties.manualOrder + this.STEP;
  }
}
