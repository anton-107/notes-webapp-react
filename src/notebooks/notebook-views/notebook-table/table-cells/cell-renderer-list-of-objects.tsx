import "./tooltip.css";

import {
  autoUpdate,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import * as React from "react";

export type ListOfObjectsItem = { [key: string]: string };

interface CellRendererListOfObjectsProperties {
  objects: ListOfObjectsItem[];
}

export function CellRendererListOfObjects(
  props: CellRendererListOfObjectsProperties
): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  useInteractions([hover]);

  return (
    <div>
      <span ref={refs.setReference}>{props.objects.length} item(s)</span>
      {isOpen && (
        <div
          className="tooltip"
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
        >
          {props.objects.map((o) => {
            return <div key={`tooltip-${o.name}`}>{o.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}
