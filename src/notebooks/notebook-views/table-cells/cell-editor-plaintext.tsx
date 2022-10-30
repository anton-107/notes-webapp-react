import * as React from "react";
import { useEffect, useRef } from "react";

interface CellEditorPlaintextProperties {
  onSave: (value: string) => void;
}

export function CellEditorPlaintext(
  props: CellEditorPlaintextProperties
): React.ReactElement {
  const inputElement = useRef(null);

  const saveValue = (value: string) => {
    props.onSave(value);
  };
  const saveValueOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      saveValue(e.target.value);
    }
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  return (
    <span>
      <input
        type="text"
        ref={inputElement}
        onKeyDown={(e) => saveValueOnEnter(e)}
        data-testid="cell-editor-plaintext"
      />
    </span>
  );
}
