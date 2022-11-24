import * as React from "react";
import { FormEvent, useRef, useState } from "react";

import { ApplicationEventEmitter, ApplicationEvents } from "../app-events";
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

  const submitForm = async (e: FormEvent, events: ApplicationEventEmitter) => {
    e.preventDefault();
    setInputDisabled(true);
    await notebooksService.addOne({
      "notebook-name": notebookName,
    });
    setInputDisabled(false);
    setNotebookName("");
    setFormVisible(false);
    props.onNotebookAdded();
    events.emitEvent("notebook.added");
  };
  const addNotebookOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    events: ApplicationEventEmitter
  ) => {
    if (e.code === "Enter" && !e.shiftKey) {
      await submitForm(e, events);
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
    <ApplicationEvents.Consumer>
      {(events) => (
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
            <form
              onSubmit={(e) => submitForm(e, events)}
              data-testid="add-notebook-form"
            >
              <div>
                <input
                  ref={inputElement}
                  onChange={(e) => setNotebookName(e.target.value)}
                  onBlur={hideForm}
                  onKeyDown={(e) => addNotebookOnEnter(e, events)}
                  value={notebookName}
                  data-testid="add-notebook-input"
                  placeholder="Add a new notebook"
                  disabled={isInputDisabled}
                />
              </div>
            </form>
          )}
        </div>
      )}
    </ApplicationEvents.Consumer>
  );
}
