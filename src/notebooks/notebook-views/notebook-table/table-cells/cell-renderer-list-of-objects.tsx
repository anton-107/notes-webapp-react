import "./tooltip.css";

import {
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import * as React from "react";

import { sortKeys } from "./auto-columns-sorter";

export type ListOfObjectsItem = { [key: string]: string };

interface CellRendererListOfObjectsProperties {
  objects: ListOfObjectsItem[];
}

export function CellRendererListOfObjects(
  props: CellRendererListOfObjectsProperties
): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift()],
  });

  const hover = useHover(context);
  useInteractions([hover]);

  const defineColumns = (objects: ListOfObjectsItem[]): string[] => {
    if (objects.length <= 0) {
      return [];
    }
    const refObject = objects[0];
    const columns = Object.keys(refObject);
    return sortKeys(columns);
  };

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
                  {columns.map((k) => {
                    return <th key={`table-header-${k}`}>{k}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {props.objects.map((o, rowIdx) => {
                  return (
                    <tr key={`row-${rowIdx}`}>
                      {columns.map((k, colIdx) => {
                        return <td key={`cell-${rowIdx}-${colIdx}`}>{o[k]}</td>;
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
