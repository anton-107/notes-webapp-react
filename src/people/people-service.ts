import { API_ROOT } from "../environment";

export interface Person {
  id: string;
  name: string;
  email: string;
}

export interface AddPersonRequest {
  "person-name": string;
  "person-email": string;
}
export class PeopleService {
  public async listAll(): Promise<Person[]> {
    const request = await fetch(`${API_ROOT}/person`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resp = await request.json();
    return resp.people;
  }
  public async addOne(person: AddPersonRequest) {
    const request = await fetch(`${API_ROOT}/person`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("add person response", resp);
    return resp;
  }
  public async deleteOne(personID: string) {
    const request = await fetch(`${API_ROOT}/delete-person`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "person-id": personID }),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("delete person response", resp);
    return resp;
  }
}
