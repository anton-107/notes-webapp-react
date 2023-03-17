import "./notebook-table.component.css";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { sortNotes } from "../../notes/notes-local-sort-service";
import { Note, NotesService } from "../../notes/notes-service";
import { NotebooksService, NotebookTableColumn } from "../notebooks-service";
import { NotebookTableRow, TableCell } from "./notebook-table/table-row";
import { NotebookTableColumnSidePanel } from "./notebook-table-column-side-panel";

export function NotebookTableComponent(): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [isSortAscending, setSortAscending] = useState(true);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setTableColumns(notebook.tableColumns || []);
  };

  const loadNotes = async () => {
    setIsLoading(true);
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    setNotes(notes.filter((x) => !x.type || x.type.type !== "notes-container"));
    setIsLoading(false);
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
    await loadNotes();
  };

  const changeRowsSort = (column: NotebookTableColumn) => {
    setSortAscending(!isSortAscending);
    const direction = isSortAscending ? 1 : -1;
    const sortedNotes = sortNotes([...notes], column, direction);
    setNotes(sortedNotes);
  };

  useEffect(() => {
    loadNotes();
    loadNotebook(notebookID);
    loadSupportedColumns();
  }, [location]);

  return (
    <div onClick={hideSidePanel} className="single-page-content-wrapper">
      <div className="content-block" data-testid="notebook-table-view">
        {isLoading && <span>Loading...</span>}

        <table className="data-table notes-table">
          <thead>
            <tr>
              <th>Note</th>
              {tableColumns.map((x) => {
                return (
                  <th
                    data-testid={`dynamic-column-header-${x.columnType}`}
                    onClick={() => changeRowsSort(x)}
                  >
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
            {tableColumns &&
              supportedColumnsMap &&
              notes.map((n) => (
                <NotebookTableRow
                  note={n}
                  tableColumns={tableColumns}
                  supportedColumnsMap={supportedColumnsMap}
                  activeCellToEdit={activeCellToEdit}
                  onChangeActiveCellToEdit={(cell) => setActiveCellToEdit(cell)}
                  onCellSaved={saveCellValue}
                />
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
