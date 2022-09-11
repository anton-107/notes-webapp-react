import * as React from "react";
import { useEffect, useState } from "react";
import "./note-details.css";
import { Note, NotesService } from "./notes-service";

interface NoteDetailsProps {
  note: Note;
  onNoteDeleted: (noteID: string) => void;
  onNoteEdited: (note: Note) => void;
}

export function NoteDetails(props: NoteDetailsProps): React.ReactElement {
  const [isMoreActionsMenuOpen, setMoreActionsMenuOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const openMoreActionsMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setMoreActionsMenuOpen(true);
  };
  const hideMoreActionsMenu = () => {
    setMoreActionsMenuOpen(false);
  };

  const deleteNote = async (noteID: string) => {
    const notesService = new NotesService();
    await notesService.deleteNote(noteID);
    props.onNoteDeleted(noteID);
  };

  const changeNoteContent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
  };
  const saveNoteContent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
    await persistNote({
      ...props.note,
      content: noteContent,
    });
  };
  const saveNoteContentOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      await saveNoteContent(e);
    }
  };
  const persistNote = async (note: Note) => {
    const notesService = new NotesService();
    const persistedNote = await notesService.editNote({
      "note-id": note.id,
      "note-content": noteContent,
      "note-type": note.type.type,
      "notebook-id": note.notebook.id,
    });
    props.onNoteEdited(persistedNote);
  };

  useEffect(() => {
    setMoreActionsMenuOpen(false);
    setNoteContent(props.note.content);
  }, [props.note]);

  return (
    <div onClick={hideMoreActionsMenu}>
      <div className="details-top-menu">
        <div className="details-top-menu-left"></div>
        <div className="details-top-menu-right">
          <div
            data-testid="more-actions-dropdown-menu"
            className={
              isMoreActionsMenuOpen ? "dropdown-menu open" : "dropdown-menu"
            }
          >
            <button
              className="simple-button"
              onClick={openMoreActionsMenu}
              data-testid="more-actions-menu-button"
            >
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            <div className="dropdown-content">
              <ul className="actions-list">
                <li className="warning-action">
                  <a
                    href="#"
                    onClick={() => deleteNote(props.note.id)}
                    data-testid={`action-delete-note-${props.note.id}`}
                  >
                    Delete this note
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="content-block">
        <input
          type="text"
          value={noteContent}
          className="note-content-edit-input"
          onChange={changeNoteContent}
          onBlur={saveNoteContent}
          onKeyPress={saveNoteContentOnEnter}
          data-testid="note-details-content-edit-input"
        />
      </div>
    </div>
  );
}
