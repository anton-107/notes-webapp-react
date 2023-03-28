import "./tooltip.css";

import { useFloating, useHover, useInteractions } from "@floating-ui/react";
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
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);
  useInteractions([hover]);

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
          {props.objects.map((o) => {
            return <div key={`tooltip-${o.name}`}>{o.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}
