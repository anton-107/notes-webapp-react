import "./note-details.css";

import * as React from "react";
import { useEffect, useState } from "react";

import { API_ROOT } from "../environment";
import { Note, NoteAttachment, NotesService } from "./notes-service";

interface NoteDetailsProps {
  note: Note;
  onNoteDeleted: (noteID: string) => void;
  onNoteEdited: (note: Note) => void;
}

export function NoteDetails(props: NoteDetailsProps): React.ReactElement {
  const [isMoreActionsMenuOpen, setMoreActionsMenuOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [attachments, setAttachments] = useState<NoteAttachment[]>([]);

  const loadAttachments = async (noteID: string) => {
    const notesService = new NotesService();
    const attachments = await notesService.listAttachments(noteID);
    console.log("ATTACHMENTS", attachments);
    setAttachments(attachments);
  };

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
      "notebook-id": note.notebookID,
      "note-section": null,
    });
    props.onNoteEdited(persistedNote);
  };

  useEffect(() => {
    setMoreActionsMenuOpen(false);
    setNoteContent(props.note.content);
    loadAttachments(props.note.id);
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
              className="simple-button dropdown-button"
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
      <div className="content-block">Note ID: {props.note.id}</div>
      <div className="content-block">
        <pre>{JSON.stringify(props.note.extensionProperties, null, 4)}</pre>
      </div>
      {attachments && (
        <div className="content-block">
          {attachments.map((a: NoteAttachment) => {
            return (
              <div
                data-testid={`attachment-${a.id}`}
                key={`attachment-${a.id}`}
              >
                [attachment]&nbsp;
                <a
                  href={`${API_ROOT}/note/${props.note.id}/attachment/${a.id}`}
                  download="test.xml"
                >
                  {a.name}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
