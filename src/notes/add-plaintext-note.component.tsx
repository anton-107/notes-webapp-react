import * as React from "react";
import { FormEvent, useState } from "react";
import "./add-plaintext-note.component.css";
import { NotesService } from "./notes-service";

interface AddPlaintextNoteComponentProperties {
  notebookID: string;
  onNoteAdded: () => void;
}

export function AddPlaintextNoteComponent(
  props: AddPlaintextNoteComponentProperties
): React.ReactElement {
  const notesService = new NotesService();
  const [noteContent, setNoteContent] = useState<string>("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    await notesService.addNote({
      "note-type": "note",
      "notebook-id": props.notebookID,
      "note-content": noteContent,
    });
    setNoteContent("");
    props.onNoteAdded();
  };
  return (
    <div>
      <form onSubmit={submitForm} data-testid="add-plaintext-note-form">
        <h2>Add a note:</h2>
        <div className="plaintext-note-textarea">
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            value={noteContent}
            data-testid="add-plaintext-note-textarea"
          ></textarea>
        </div>
        <input
          type="submit"
          value="Add note"
          className="form-button"
          data-testid="add-plaintext-note-submit-button"
        />
      </form>
    </div>
  );
}
