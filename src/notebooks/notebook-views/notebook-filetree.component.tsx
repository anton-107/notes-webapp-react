import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Note, NotesService } from "../../notes/notes-service";

interface FileEntry {
  name: string;
}

function showFilesInFolder(notes: Note[], folder: string): FileEntry[] {
  const folders: Set<string> = new Set();

  notes
    .filter((n) => n.content.startsWith(folder))
    .forEach((n) => {
      const parts = n.content.substring(folder.length).split("/");
      const fileName =
        folder.length > 1 && parts.length > 1 ? parts[1] : parts[0];
      folders.add(fileName);
    });

  return Array.from(folders.values()).map((f) => {
    return {
      name: f,
    };
  });
}

export function NotebookFileTreeComponent(): React.ReactElement {
  const { notebookID } = useParams();
  const [files, setFiles] = useState([]);

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    const files = showFilesInFolder(notes, "/");
    setFiles(files);
  };

  useEffect(() => {
    loadNotes();
  }, [location]);

  return (
    <div className="content-block" data-testid="notebook-filetree-view">
      {files.map((file) => (
        <div key={`file-${file.name}`} data-testid={`file-${file.name}`}>
          {file.name}
        </div>
      ))}
    </div>
  );
}
