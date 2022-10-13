import { API_ROOT } from "../environment";
export interface AddPersonRequest {
  "person-name": string;
  "person-email": string;
}
export class PeopleService {
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
}
