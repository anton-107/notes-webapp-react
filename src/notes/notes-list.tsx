import * as React from "react";
import { Note } from "./notes-service";
import { Draggable } from "react-beautiful-dnd";

interface NotesListProperties {
  notes: Note[];
  onNoteSelected: (note: Note) => void;
}
export function NotesList(props: NotesListProperties): React.ReactElement {
  const selectNote = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    note: Note
  ) => {
    e.preventDefault();
    e.stopPropagation();
    props.onNoteSelected(note);
  };

  return (
    <div>
      {props.notes.map((n: Note, index) => {
        return (
          <Draggable draggableId={n.id} index={index} key={`note-${n.id}`}>
            {(provided) => (
              <div
                data-testid={`note-${n.id}`}
                className="note-wrapper"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="note-item">
                  <div
                    className="note-content"
                    onClick={(e) => selectNote(e, n)}
                    data-testid={`note-content-${n.id}`}
                  >
                    {n.content}
                    {n.extensionProperties && n.extensionProperties.youtubeURL}
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
}
