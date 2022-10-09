import { API_ROOT } from "../environment";

export interface Notebook {
  id: string;
  name: string;
}
export interface AddNotebookRequest {
  "notebook-name": string;
}

export class NotebooksService {
  public async listAll(): Promise<Notebook[]> {
    const request = await fetch(`${API_ROOT}/notebook`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resp = await request.json();

    return resp.notebooks;
  }
  public async getOne(notebookID: string): Promise<Notebook> {
    const request = await fetch(`${API_ROOT}/notebook/${notebookID}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await request.json();
  }
  public async addOne(notebook: AddNotebookRequest) {
    const request = await fetch(`${API_ROOT}/notebook`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("add notebook response", resp);
    return resp;
  }
  public async deleteOne(notebookID: string) {
    const request = await fetch(`${API_ROOT}/delete-notebook`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "notebook-id": notebookID }),
      credentials: "include",
    });
    const resp = await request.json();
    return resp;
  }
}
