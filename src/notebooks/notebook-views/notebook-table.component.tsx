import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Note, NotesService } from "../../notes/notes-service";
import { NotebooksService, NotebookTableColumn } from "../notebooks-service";
import { NotebookTableColumnSidePanel } from "./notebook-table-column-side-panel";
import "./notebook-table.component.css";
import { CellEditorCheckbox } from "./table-cells/cell-editor-checkbox";
import { CellEditorPlaintext } from "./table-cells/cell-editor-plaintext";

interface TableCell {
  noteID: string;
  dynamicColumnIndex: number;
}

export function NotebookTableComponent(): React.ReactElement {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tableColumns, setTableColumns] = useState<NotebookTableColumn[]>([]);
  const [supportedColumns, setSupportedColumns] = useState<
    NotebookTableColumn[]
  >([]);
  const [supportedColumnsMap, setSupportedColumnsMap] = useState<
    Record<string, NotebookTableColumn>
  >({});
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const [activeCellToEdit, setActiveCellToEdit] = useState<TableCell | null>(
    null
  );
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setTableColumns(notebook.tableColumns || []);
  };

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    setNotes(notes.filter((x) => !x.type || x.type.type !== "notes-container"));
  };

  const loadSupportedColumns = async () => {
    const notebooksService = new NotebooksService();
    const supportedColumns = await notebooksService.listSupportedColumns();
    setSupportedColumns(supportedColumns);

    const columnsMap: Record<string, NotebookTableColumn> = {};
    supportedColumns.forEach((c) => {
      columnsMap[c.columnType] = c;
    });
    setSupportedColumnsMap(columnsMap);
  };

  const showSidePanel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setSidePanelVisible(true);
  };

  const hideSidePanel = () => {
    setSidePanelVisible(false);
  };

  const saveColumns = async (enabledColumns: NotebookTableColumn[]) => {
    const notebookService = new NotebooksService();
    await notebookService.updateOne({
      "notebook-id": notebookID,
      "table-columns": enabledColumns.map((x) => {
        return { name: x.name, "column-type": x.columnType };
      }),
    });
    hideSidePanel();
    loadNotebook(notebookID);
  };

  const isCellActivelyEdited = (
    noteID: string,
    columnIndex: number
  ): boolean => {
    return (
      activeCellToEdit !== null &&
      activeCellToEdit.noteID === noteID &&
      activeCellToEdit.dynamicColumnIndex === columnIndex
    );
  };

  const startEditCell = (noteID: string, columnIndex: number) => {
    setActiveCellToEdit({ noteID, dynamicColumnIndex: columnIndex });
  };

  const saveCellValue = async (
    noteID: string,
    column: NotebookTableColumn,
    newValue: string
  ) => {
    const notesService = new NotesService();
    await notesService.editNote({
      "note-id": noteID,
      "table-columns": { [column.columnType]: newValue },
    });
    setActiveCellToEdit(null);
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
    loadNotebook(notebookID);
    loadSupportedColumns();
  }, [location]);

  return (
    <div onClick={hideSidePanel} className="single-page-content-wrapper">
      <div className="content-block" data-testid="notebook-table-view">
        <table className="data-table notes-table">
          <thead>
            <tr>
              <th>Note</th>
              {tableColumns.map((x) => {
                return (
                  <th data-testid={`dynamic-column-header-${x.columnType}`}>
                    {x.name}
                  </th>
                );
              })}
              <th>
                <a
                  href="#"
                  title="Columns configuration"
                  className="table-header-link"
                  data-testid="add-table-column-link"
                  onClick={(e) => showSidePanel(e)}
                >
                  +
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n) => (
              <tr data-testid={`note-row-${n.id}`} key={`note-${n.id}`}>
                <td>{n.content}</td>
                {tableColumns.map((c, columnIndex) => {
                  return (
                    <td
                      onClick={() =>
                        supportedColumnsMap[c.columnType].valueType !==
                          "boolean" && startEditCell(n.id, columnIndex)
                      }
                      data-testid={`table-cell-${n.id}-${c.columnType}`}
                    >
                      <span>
                        {supportedColumnsMap[c.columnType].valueType ===
                          "boolean" && (
                          <CellEditorCheckbox
                            testid={`${c.columnType}-${n.id}`}
                            value={
                              n.columnValues &&
                              n.columnValues[c.columnType] === "true"
                            }
                            onSave={(value: boolean) =>
                              saveCellValue(
                                n.id,
                                tableColumns[columnIndex],
                                String(value)
                              )
                            }
                          />
                        )}
                        {isCellActivelyEdited(n.id, columnIndex) && (
                          <span>
                            <CellEditorPlaintext
                              onSave={(value) =>
                                saveCellValue(
                                  n.id,
                                  tableColumns[columnIndex],
                                  value
                                )
                              }
                            />
                          </span>
                        )}
                        {!isCellActivelyEdited(n.id, columnIndex) &&
                          n.columnValues && (
                            <span
                              data-testid={`table-cell-displayed-value-${n.id}-${c.columnType}`}
                            >
                              {n.columnValues[c.columnType]}
                            </span>
                          )}
                      </span>
                    </td>
                  );
                })}
                <td className="table-no-highlight"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NotebookTableColumnSidePanel
        enabledColumns={tableColumns}
        isVisible={isSidePanelVisible}
        supportedColumns={supportedColumns}
        onColumnConfigurationChanged={saveColumns}
        onCancelled={hideSidePanel}
      />
    </div>
  );
}
