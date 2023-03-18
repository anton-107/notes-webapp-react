import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { NotebookTableColumn } from "../notebooks-service";

interface NotebookTableColumnSidePanelProps {
  isVisible: boolean;
  supportedColumns: NotebookTableColumn[];
  enabledColumns: NotebookTableColumn[];
  onColumnConfigurationChanged: (enabledColumns: NotebookTableColumn[]) => void;
  onCancelled: () => void;
}

export function NotebookTableColumnSidePanel(
  props: NotebookTableColumnSidePanelProps
): React.ReactElement {
  const [enabledColumns, setEnabledColumns] = useState<NotebookTableColumn[]>(
    []
  );
  const columnCheckboxes = useRef<{ [key: string]: HTMLInputElement }>({});

  const isColumnTypeChecked = (columnType: string): boolean => {
    // console.log('enabledColumns', enabledColumns);
    return (
      enabledColumns.find((x) => x.columnType === columnType) !== undefined
    );
  };

  const handleCheckboxChange = () => {
    const newColumns = props.supportedColumns.filter(
      (x) => columnCheckboxes.current[x.columnType].checked
    );
    setEnabledColumns(newColumns);
  };

  const saveColumnsConfiguration = () => {
    const enabledColumns = props.supportedColumns.filter(
      (x) => columnCheckboxes.current[x.columnType].checked
    );
    props.onColumnConfigurationChanged(enabledColumns);
  };

  useEffect(() => {
    console.log("enabledColumns changed", props.enabledColumns);
    setEnabledColumns(props.enabledColumns);
  }, [props.enabledColumns]);

  return (
    <div
      data-testid="single-notebook-page-sidepanel"
      className={props.isVisible ? "side-panel visible" : "side-panel hidden"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="content-block">
        <h1>Add a column</h1>
        <div className="form-field-block">
          Visible columns:
          {props.supportedColumns.map((column) => {
            return (
              <div
                key={`sidepanel-setting-visible-column-${column.columnType}`}
              >
                <label>
                  <input
                    type="checkbox"
                    value={column.columnType}
                    key={column.columnType}
                    ref={(el: HTMLInputElement) =>
                      (columnCheckboxes.current[column.columnType] = el)
                    }
                    checked={isColumnTypeChecked(column.columnType)}
                    onChange={handleCheckboxChange}
                    data-testid={`checkbox-${column.columnType}`}
                  />{" "}
                  {column.name}
                </label>
              </div>
            );
          })}
        </div>
        <div className="form-field-block">
          <button
            className="form-button"
            onClick={saveColumnsConfiguration}
            data-testid="save-table-columns-button"
          >
            Save
          </button>
          &nbsp;
          <button
            className="form-button form-button-secondary"
            onClick={props.onCancelled}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
