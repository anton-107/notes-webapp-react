import * as React from "react";
import { FormEvent, useState } from "react";
import "./add-plaintext-note.component.css";
import { NotesService } from "./notes-service";

interface AddPlaintextNoteComponentProperties {
  notebookID: string;
  sectionID: string | null;
  onNoteAdded: () => void;
}

export function AddPlaintextNoteComponent(
  props: AddPlaintextNoteComponentProperties
): React.ReactElement {
  const notesService = new NotesService();
  const [noteContent, setNoteContent] = useState<string>("");
  const [isTextareaDisabled, setTextareaDisabled] = useState<boolean>(false);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setTextareaDisabled(true);
    await notesService.addNote({
      "note-type": "note",
      "notebook-id": props.notebookID,
      "note-content": noteContent,
      "note-section": props.sectionID,
    });
    setTextareaDisabled(false);
    setNoteContent("");
    props.onNoteAdded();
  };
  const addNoteOnEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.code === "Enter" && !e.shiftKey) {
      await submitForm(e);
    }
  };
  return (
    <div>
      <form onSubmit={submitForm} data-testid="add-plaintext-note-form">
        <div className="plaintext-note-textarea">
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            onKeyDown={addNoteOnEnter}
            value={noteContent}
            data-testid="add-plaintext-note-textarea"
            placeholder="Add a new note"
            disabled={isTextareaDisabled}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
