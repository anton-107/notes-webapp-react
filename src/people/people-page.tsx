import * as React from "react";
import { useEffect, useState } from "react";
import { AddPersonComponent } from "./add-person.component";
import { PeopleService, Person } from "./people-service";

export function PeoplePage(): React.ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    setLoading(true);
    const peopleService = new PeopleService();
    const people = await peopleService.listAll();
    setLoading(false);
    setPeople(people);
  };
  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div>
      <div className="content-block">
        <h1>People</h1>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p: Person) => {
                return (
                  <tr data-testid={`person-${p.id}`} key={`person-${p.id}`}>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="content-block">
        <AddPersonComponent onPersonAdded={loadPeople} />
      </div>
    </div>
  );
}
