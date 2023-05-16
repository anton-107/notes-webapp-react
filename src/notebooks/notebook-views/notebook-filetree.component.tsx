import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  FileEntry,
  groupNotesAsFileTree,
} from "../../notes/notes-filetree-service";
import { NotesService } from "../../notes/notes-service";

export function NotebookFileTreeComponent(): React.ReactElement {
  const location = useLocation();
  const { notebookID } = useParams();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  const loadNotes = async (currentPath: string) => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    const files = groupNotesAsFileTree(notes, currentPath);
    setFiles(files);
  };

  useEffect(() => {
    const currentPath =
      new URLSearchParams(location.search).get("currentPath") || "";
    setCurrentPath(currentPath);
    loadNotes(currentPath || "/");
  }, [location]);

  return (
    <div className="content-block" data-testid="notebook-filetree-view">
      <div>Current path: {currentPath}</div>
      {files.map((file) => (
        <div key={`file-${file.name}`} data-testid={`file-${file.name}`}>
          {file.isFolder && <span>[folder] </span>}
          {file.isFolder && (
            <Link
              to={`/notebook/${notebookID}/file-tree?currentPath=${currentPath}/${file.name}`}
            >
              {file.name}
            </Link>
          )}
          {!file.isFolder && <span>{file.name}</span>}
        </div>
      ))}
    </div>
  );
}
