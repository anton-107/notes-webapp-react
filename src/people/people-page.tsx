import * as React from "react";
import { useEffect } from "react";
import { AddPersonComponent } from "./add-person.component";

export function PeoplePage(): React.ReactElement {
  const loadPeople = () => {
    console.log("not implemented: loading people list");
  };
  useEffect(() => {
    loadPeople();
  }, []);
  return (
    <div>
      <div className="content-block">
        <h1>People</h1>
      </div>
      <div className="content-block">
        <AddPersonComponent onPersonAdded={loadPeople} />
      </div>
    </div>
  );
}
