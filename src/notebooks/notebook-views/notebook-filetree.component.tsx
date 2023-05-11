import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { groupNotesAsFileTree } from "../../notes/notes-filetree-service";
import { NotesService } from "../../notes/notes-service";

export function NotebookFileTreeComponent(): React.ReactElement {
  const { notebookID } = useParams();
  const [files, setFiles] = useState([]);

  const loadNotes = async () => {
    const notesService = new NotesService();
    const notes = await notesService.listAllForNotebook(notebookID);
    const files = groupNotesAsFileTree(notes, "/");
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
