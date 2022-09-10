import * as React from "react";
import { Note, NotesService } from "./notes-service";
import "./note-details.css";
import { useEffect, useState } from "react";

interface NoteDetailsProps {
  note: Note;
  onNoteDeleted: (noteID: string) => void;
}

export function NoteDetails(props: NoteDetailsProps): React.ReactElement {
  const [isMoreActionsMenuOpen, setMoreActionsMenuOpen] = useState(false);

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

  useEffect(() => {
    setMoreActionsMenuOpen(false);
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
        <h2>{props.note.content}</h2>
      </div>
    </div>
  );
}
