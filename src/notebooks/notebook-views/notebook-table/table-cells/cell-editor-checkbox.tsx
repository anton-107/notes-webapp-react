import * as React from "react";
import { useEffect, useRef } from "react";

interface CellEditorCheckboxProperties {
  testid: string;
  value: boolean;
  onSave: (value: boolean) => void;
}

export function CellEditorCheckbox(
  props: CellEditorCheckboxProperties
): React.ReactElement {
  const inputElement = useRef(null);

  const saveValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSave(e.target.checked === true);
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  return (
    <span>
      <input
        type="checkbox"
        ref={inputElement}
        onChange={saveValue}
        data-testid={`cell-editor-checkbox-${props.testid}`}
        checked={props.value}
      />
    </span>
  );
}
