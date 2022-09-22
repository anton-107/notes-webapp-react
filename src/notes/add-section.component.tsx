import * as React from "react";
import { useRef, useState } from "react";
import { NotesService } from "./notes-service";

interface AddSectionComponentProperties {
  notebookID: string;
  onSectionAdded: () => void;
}

export function AddSectionComponent(
  props: AddSectionComponentProperties
): React.ReactElement {
  const notesService = new NotesService();
  const inputElement = useRef(null);
  const [isInputVisible, setInputVisible] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [sectionName, setSectionName] = useState<string>("");

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputElement.current.focus();
    });
  };

  const submitForm = async () => {
    setInputDisabled(true);
    await notesService.addNote({
      "note-type": "notes-container",
      "notebook-id": props.notebookID,
      "note-content": sectionName,
      "note-section": null,
    });
    setInputDisabled(false);
    setInputVisible(false);
    setSectionName("");
    props.onSectionAdded();
  };

  const addSectionOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      await submitForm();
    }
  };

  return (
    <div>
      <div style={{ display: isInputVisible ? "block" : "none" }}>
        <input
          placeholder="New section"
          ref={inputElement}
          onKeyDown={addSectionOnEnter}
          disabled={isInputDisabled}
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          data-testid="new-section-name-input"
        />
      </div>
      {!isInputVisible && (
        <button
          className="simple-button"
          onClick={showInput}
          data-testid="add-section-button"
        >
          + Add section
        </button>
      )}
    </div>
  );
}
