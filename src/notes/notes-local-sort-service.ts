import { NotebookTableColumn } from "../notebooks/notebooks-service";
import { Note } from "./notes-service";

type SortDirection = -1 | 1;

export function sortNotes(
  notes: Note[],
  column: NotebookTableColumn,
  direction: SortDirection
): Note[] {
  notes.sort((a, b) => {
    let aValue: string | number = a.content;
    let bValue: string | number = b.content;

    if (
      column.valueSource === "extensionProperties" &&
      a.extensionProperties &&
      b.extensionProperties
    ) {
      aValue = a.extensionProperties[column.columnType];
      bValue = b.extensionProperties[column.columnType];
    }
    if (column.valueType === "number") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
      if (Number.isNaN(aValue)) {
        aValue = 0;
      }
      if (Number.isNaN(bValue)) {
        bValue = 0;
      }
    }
    return aValue > bValue ? direction : -1 * direction;
  });
  return notes;
}
