import * as React from "react";
import { useRef } from "react";
import { NotebookTableColumn } from "../notebooks-service";

interface NotebookTableColumnSidePanelProps {
  isVisible: boolean;
  onColumnTypeAdded: (t: NotebookTableColumn) => void;
}

export function NotebookTableColumnSidePanel(
  props: NotebookTableColumnSidePanelProps
): React.ReactElement {
  const columnType = useRef<HTMLSelectElement>();

  const supportedColumnTypes = [
    { name: "Due date", columnType: "due-date" },
    { name: "Start date", columnType: "start-date" },
    { name: "End date", columnType: "end-date" },
    { name: "Assignee", columnType: "task-assignee" },
    { name: "Completed", columnType: "task-completed" },
  ];

  const addColumn = () => {
    const selectedColumnType = supportedColumnTypes.find(
      (x) => x.columnType === columnType.current.value
    );
    props.onColumnTypeAdded(selectedColumnType);
  };
  return (
    <div
      data-testid="single-notebook-page-sidepanel"
      className={props.isVisible ? "side-panel visible" : "side-panel hidden"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="content-block">
        <h1>Add a column</h1>
        <div className="form-field-block">
          <label>New column type: </label>
          <select ref={columnType}>
            {supportedColumnTypes.map((column) => {
              return (
                <option value={column.columnType} key={column.columnType}>
                  {column.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-field-block">
          <button
            className="form-button"
            onClick={addColumn}
            data-testid="add-table-column-button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
