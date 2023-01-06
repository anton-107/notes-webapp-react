import "./people-page.css";

import * as React from "react";
import { useEffect, useState } from "react";

import { AddPersonComponent } from "./add-person.component";
import { PeopleService, Person } from "./people-service";

export function PeoplePage(): React.ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [menuOpenForPerson, setMenuOpenForPerson] = useState(null);

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

  const openPersonActionsMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    personID: string
  ) => {
    e.stopPropagation();
    setMenuOpenForPerson(personID);
  };
  const hidePersonActionsMenu = () => {
    setMenuOpenForPerson(null);
  };

  const deletePerson = async (personID: string) => {
    console.log("delete person", personID);
    const personeService = new PeopleService();
    await personeService.deleteOne(personID);
    loadPeople();
  };

  return (
    <div
      className="single-page-container"
      onClick={hidePersonActionsMenu}
      data-testid="people-page-container"
    >
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
                    <td data-entityid={p.id}>{p.name}</td>
                    <td>{p.email}</td>
                    <td>
                      <div
                        data-testid={`person-actions-dropdown-menu-${p.id}`}
                        className={
                          menuOpenForPerson === p.id
                            ? "dropdown-menu open"
                            : "dropdown-menu"
                        }
                      >
                        <button
                          className="simple-button dropdown-button"
                          onClick={(e) => openPersonActionsMenu(e, p.id)}
                          data-testid={`person-actions-menu-button-${p.id}`}
                        >
                          <span className="material-symbols-outlined">
                            more_horiz
                          </span>
                        </button>
                        <div className="dropdown-content dropdown-content-person-actions">
                          <ul className="actions-list">
                            <li className="warning-action">
                              <a
                                href="#"
                                onClick={() => deletePerson(p.id)}
                                data-testid={`action-delete-person-${p.id}`}
                              >
                                Delete this person entry
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
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
