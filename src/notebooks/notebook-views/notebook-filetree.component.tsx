import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  FileEntry,
  groupNotesAsFileTree,
} from "../../notes/notes-filetree-service";
import { NotesService } from "../../notes/notes-service";
import { NotebooksService, NotebookTableColumn } from "../notebooks-service";

export function NotebookFileTreeComponent(): React.ReactElement {
  const location = useLocation();
  const { notebookID } = useParams();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [levelUpPath, setLevelUpPath] = useState<string | null>(null);
  const [tableColumns, setTableColumns] = useState<NotebookTableColumn[]>([]);

  const loadNotes = async (currentPath: string) => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    const files = groupNotesAsFileTree(notes, currentPath);
    setFiles(files);
  };
  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setTableColumns(notebook.tableColumns || []);
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, []);

  useEffect(() => {
    const currentPath =
      new URLSearchParams(location.search).get("currentPath") || "";
    setCurrentPath(currentPath);
    setLevelUpPath(getLevelUpPath(currentPath));
    loadNotes(currentPath || "/");
  }, [location]);

  const getLevelUpPath = (path: string): string | null => {
    const parts = path.split("/");
    if (parts.length <= 1) {
      return null;
    }
    return parts.slice(0, -1).join("/");
  };

  return (
    <div className="content-block" data-testid="notebook-filetree-view">
      <table className="data-table notes-table">
        <thead>
          <tr>
            <th>File</th>
            {tableColumns.map((x) => {
              return (
                <th
                  data-testid={`dynamic-column-header-${x.columnType}`}
                  key={`dynamic-column-header-${x.columnType}`}
                >
                  {x.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {levelUpPath !== null && (
            <tr>
              <td>
                <Link
                  to={`/notebook/${notebookID}/file-tree?currentPath=${levelUpPath}`}
                  data-testid="filetree-level-up-link"
                >
                  ..
                </Link>
              </td>
            </tr>
          )}
          {files.map((file) => (
            <tr key={`file-${file.name}`} data-testid={`file-${file.name}`}>
              <td>
                {file.isFolder && <span>[folder] </span>}
                {file.isFolder && (
                  <Link
                    to={`/notebook/${notebookID}/file-tree?currentPath=${currentPath}/${file.name}`}
                  >
                    {file.name}
                  </Link>
                )}
                {!file.isFolder && <span>{file.name}</span>}
              </td>
              {tableColumns.map((c) => {
                return (
                  <td
                    data-testid={`table-cell-${file.name}-${c.columnType}`}
                    key={`table-cell-${file.name}-${c.columnType}`}
                  >
                    <span>
                      {c.valueSource === "extensionProperties" &&
                        file.extensionProperties &&
                        file.extensionProperties[c.columnType] && (
                          <span
                            data-testid={`table-cell-displayed-value-${file.name}-${c.columnType}`}
                          >
                            {c.valueType !== "list-of-objects" && (
                              <span>
                                {file.extensionProperties[c.columnType]}
                              </span>
                            )}
                          </span>
                        )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
