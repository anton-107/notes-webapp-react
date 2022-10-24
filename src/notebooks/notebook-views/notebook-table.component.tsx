import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Note, NotesService } from "../../notes/notes-service";
import { NotebooksService, NotebookTableColumn } from "../notebooks-service";
import { NotebookTableColumnSidePanel } from "./notebook-table-column-side-panel";
import "./notebook-table.component.css";

export function NotebookTableComponent(): React.ReactElement {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tableColumns, setTableColumns] = useState<NotebookTableColumn[]>([]);
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setTableColumns(notebook.tableColumns || []);
  };

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    setNotes(notes);
  };

  const showSidePanel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setSidePanelVisible(true);
  };

  const hideSidePanel = () => {
    setSidePanelVisible(false);
  };

  const addColumn = async (columnType: NotebookTableColumn) => {
    const notebookService = new NotebooksService();
    const notebook = await notebookService.getOne(notebookID);
    const columns = notebook.tableColumns ? [...notebook.tableColumns] : [];
    columns.push(columnType);
    await notebookService.updateOne({
      "notebook-id": notebookID,
      "table-columns": columns.map((x) => {
        return { name: x.name, "column-type": x.columnType };
      }),
    });
    hideSidePanel();
    loadNotebook(notebookID);
  };

  useEffect(() => {
    loadNotes();
    loadNotebook(notebookID);
  }, [location]);

  return (
    <div onClick={hideSidePanel} className="single-page-content-wrapper">
      <div className="content-block" data-testid="notebook-table-view">
        <table className="data-table notes-table">
          <thead>
            <tr>
              <th>Note</th>
              <th>ID</th>
              {tableColumns.map((x) => {
                return <th data-testid={`dynamic-column-header-${x.columnType}`}>{x.name}</th>;
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
                <td>{n.id}</td>
                {tableColumns.map(() => {
                  return <td>&nbsp;</td>;
                })}
                <td className="table-no-highlight"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NotebookTableColumnSidePanel
        isVisible={isSidePanelVisible}
        onColumnTypeAdded={addColumn}
      />
    </div>
  );
}
