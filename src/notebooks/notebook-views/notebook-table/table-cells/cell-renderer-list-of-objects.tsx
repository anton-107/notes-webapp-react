import "./tooltip.css";

import {
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import * as React from "react";

import {
  defineColumns,
  TableColumn,
} from "../table-columns/auto-columns-definer";

export type ListOfObjectsItem = { [key: string]: string };

interface CellRendererListOfObjectsProperties {
  objects: ListOfObjectsItem[];
}

export function CellRendererListOfObjects(
  props: CellRendererListOfObjectsProperties
): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<TableColumn[]>([]);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift()],
  });

  const hover = useHover(context);
  useInteractions([hover]);

  React.useEffect(() => {
    setColumns(defineColumns(props.objects));
  }, [props.objects]);

  return (
    <div>
      <span ref={refs.setReference} role="tooltip-trigger">
        {props.objects.length} item(s)
      </span>
      {isOpen && (
        <div
          className="tooltip"
          ref={refs.setFloating}
          role="tooltip"
          style={{
            position: strategy,
            top: y,
            left: x,
            width: "max-content",
          }}
        >
          {props.objects.length > 0 && (
            <table>
              <thead>
                <tr>
                  {columns.map((column) => {
                    return (
                      <th key={`table-header-${column}`}>{column.name}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {props.objects.map((o, rowIdx) => {
                  return (
                    <tr key={`row-${rowIdx}`}>
                      {columns.map((column, colIdx) => {
                        return (
                          <td key={`cell-${rowIdx}-${colIdx}`}>
                            {column.valueRenderer(o[column.key])}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
