import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface CellEditorPlaintextProperties {
  value: string;
  onSave: (value: string) => void;
}

export function CellEditorPlaintext(
  props: CellEditorPlaintextProperties
): React.ReactElement {
  const [value, setValue] = useState<string>();
  const inputElement = useRef(null);

  const saveValue = (value: string) => {
    props.onSave(value);
  };
  const saveValueOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      saveValue((e.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputElement}
        onKeyDown={(e) => saveValueOnEnter(e)}
        data-testid="cell-editor-plaintext"
      />
    </span>
  );
}
