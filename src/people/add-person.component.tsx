import * as React from "react";
import { FormEvent, useRef, useState } from "react";

import { PeopleService } from "./people-service";

interface AddPersonComponentProperties {
  onPersonAdded: () => void;
}

export function AddPersonComponent(
  props: AddPersonComponentProperties
): React.ReactElement {
  const peopleService = new PeopleService();
  const [personName, setPersonName] = useState<string>("");
  const [personEmail, setPersonEmail] = useState<string>("");
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const nameInputElement = useRef(null);
  const emailInputElement = useRef(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setInputDisabled(true);
    await peopleService.addOne({
      "person-name": personName,
      "person-email": personEmail,
    });
    setInputDisabled(false);
    setPersonName("");
    setPersonEmail("");
    setFormVisible(false);
    props.onPersonAdded();
  };
  const showForm = () => {
    setFormVisible(true);
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
          data-testid="add-person-button"
        >
          + Add person
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={(e) => submitForm(e)} data-testid="add-person-form">
          <h2>Add a new person</h2>
          <div className="form-field-block">
            <label>Person name: </label>
            <input
              ref={nameInputElement}
              onChange={(e) => setPersonName(e.target.value)}
              value={personName}
              data-testid="add-person-name-input"
              placeholder="Person name"
              disabled={isInputDisabled}
            />
          </div>
          <div className="form-field-block">
            <label>Person email: </label>
            <input
              ref={emailInputElement}
              onChange={(e) => setPersonEmail(e.target.value)}
              value={personEmail}
              data-testid="add-person-email-input"
              placeholder="Person email"
              disabled={isInputDisabled}
            />
          </div>
          <div>
            <input type="submit" value="Add person" />
            &nbsp;
            <input
              type="button"
              value="Cancel"
              onClick={hideForm}
              data-testid="adding-person-cancel-button"
            />
          </div>
        </form>
      )}
    </div>
  );
}
