import * as React from "react";
import { FormEvent, useRef, useState } from "react";
import { NotebooksService } from "./notebooks-service";

interface AddNotebookComponentProperties {
  onNotebookAdded: () => void;
}

export function AddNotebookComponent(
  props: AddNotebookComponentProperties
): React.ReactElement {
  const notebooksService = new NotebooksService();
  const [notebookName, setNotebookName] = useState<string>("");
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const inputElement = useRef(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setInputDisabled(true);
    await notebooksService.addOne({
      "notebook-name": notebookName,
    });
    setInputDisabled(false);
    setNotebookName("");
    setFormVisible(false);
    props.onNotebookAdded();
  };
  const addNotebookOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter" && !e.shiftKey) {
      await submitForm(e);
    }
  };
  const showForm = () => {
    setFormVisible(true);
    setTimeout(() => {
      inputElement.current.focus();
    });
  };
  const hideForm = () => {
    setFormVisible(false);
  };
  return (
    <div>
      {!isFormVisible && (
        <button
          className="simple-button"
          onClick={showForm}
          data-testid="add-notebook-button"
        >
          + Add notebook
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={submitForm} data-testid="add-notebook-form">
          <div>
            <input
              ref={inputElement}
              onChange={(e) => setNotebookName(e.target.value)}
              onBlur={hideForm}
              onKeyDown={addNotebookOnEnter}
              value={notebookName}
              data-testid="add-notebook-input"
              placeholder="Add a new notebook"
              disabled={isInputDisabled}
            />
          </div>
        </form>
      )}
    </div>
  );
}
