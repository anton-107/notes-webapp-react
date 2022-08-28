import { API_ROOT } from "../environment";

export interface Notebook {
  id: string;
  name: string;
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
    console.log("[one notebook] request", request);
    const resp = await request.json();
    console.log("[one notebooks] response", resp);

    return resp;
  }
}
