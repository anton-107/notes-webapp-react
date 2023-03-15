import * as React from "react";
import { useState } from "react";

import { Note } from "../../../notes/notes-service";
import { NotebookTableColumn } from "../../notebooks-service";
import { CellEditorCheckbox } from "./table-cells/cell-editor-checkbox";
import { CellEditorPlaintext } from "./table-cells/cell-editor-plaintext";

export interface TableCell {
  noteID: string;
  dynamicColumnType: string;
}

interface NotebookTableRowProps {
  note: Note;
  tableColumns: NotebookTableColumn[];
  supportedColumnsMap: Record<string, NotebookTableColumn>;
  activeCellToEdit: TableCell | null;
  onChangeActiveCellToEdit: (cell: TableCell | null) => void;
  onCellSaved: (
    noteID: string,
    column: NotebookTableColumn,
    newValue: string
  ) => Promise<void>;
}

export function NotebookTableRow(
  props: NotebookTableRowProps
): React.ReactElement {
  const n = props.note;
  const [cellBeingUpdated, setCellBeingUpdated] = useState<TableCell | null>(
    null
  );

  const isCellActivelyEdited = (
    noteID: string,
    columnType: string
  ): boolean => {
    return (
      props.activeCellToEdit !== null &&
      props.activeCellToEdit.noteID === noteID &&
      props.activeCellToEdit.dynamicColumnType === columnType
    );
  };

  const isCellBeingUpdated = (noteID: string, columnType: string): boolean => {
    return (
      cellBeingUpdated !== null &&
      cellBeingUpdated.noteID === noteID &&
      cellBeingUpdated.dynamicColumnType === columnType
    );
  };

  const startEditCell = (noteID: string, columnType: string) => {
    props.onChangeActiveCellToEdit({ noteID, dynamicColumnType: columnType });
  };

  const saveCell = async (
    noteID: string,
    column: NotebookTableColumn,
    newValue: string
  ) => {
    props.onChangeActiveCellToEdit(null);
    setCellBeingUpdated({ noteID, dynamicColumnType: column.columnType });
    await props.onCellSaved(noteID, column, newValue);
    setCellBeingUpdated(null);
  };

  return (
    <tr data-testid={`note-row-${n.id}`} key={`note-${n.id}`}>
      <td>{n.content}</td>
      {props.tableColumns.map((c, columnIndex) => {
        return (
          <td
            onClick={() =>
              props.supportedColumnsMap[c.columnType] &&
              props.supportedColumnsMap[c.columnType].valueType !== "boolean" &&
              startEditCell(n.id, c.columnType)
            }
            data-testid={`table-cell-${n.id}-${c.columnType}`}
          >
            <span>
              {props.supportedColumnsMap[c.columnType] &&
                props.supportedColumnsMap[c.columnType].valueType ===
                  "boolean" && (
                  <CellEditorCheckbox
                    testid={`${c.columnType}-${n.id}`}
                    value={
                      n.columnValues && n.columnValues[c.columnType] === "true"
                    }
                    onSave={(value: boolean) =>
                      saveCell(
                        n.id,
                        props.tableColumns[columnIndex],
                        String(value)
                      )
                    }
                  />
                )}
              {isCellActivelyEdited(n.id, c.columnType) && (
                <span>
                  <CellEditorPlaintext
                    value={n.columnValues && n.columnValues[c.columnType]}
                    onSave={(value) =>
                      saveCell(n.id, props.tableColumns[columnIndex], value)
                    }
                  />
                </span>
              )}
              {!isCellActivelyEdited(n.id, c.columnType) &&
                c.valueSource === "columnValues" &&
                n.columnValues &&
                n.columnValues[c.columnType] && (
                  <span
                    data-testid={`table-cell-displayed-value-${n.id}-${c.columnType}`}
                  >
                    {n.columnValues[c.columnType]}
                  </span>
                )}
              {!isCellActivelyEdited(n.id, c.columnType) &&
                c.valueSource === "extensionProperties" &&
                n.extensionProperties &&
                n.extensionProperties[c.columnType] && (
                  <span
                    data-testid={`table-cell-displayed-value-${n.id}-${c.columnType}`}
                  >
                    {n.extensionProperties[c.columnType]}
                  </span>
                )}
              {isCellBeingUpdated(n.id, c.columnType) && (
                <small> (updating)</small>
              )}
            </span>
          </td>
        );
      })}
      <td className="table-no-highlight"></td>
    </tr>
  );
}
