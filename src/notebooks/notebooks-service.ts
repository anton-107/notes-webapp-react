import { API_ROOT } from "../environment";

export type NotebookColumnValueType =
  | "string"
  | "date"
  | "datetime"
  | "boolean"
  | "person-id"
  | "note-id"
  | "notebook-id";

export interface NotebookTableColumn {
  name: string;
  columnType: string;
  valueType: NotebookColumnValueType;
}

export interface Notebook {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  tableColumns: NotebookTableColumn[];
}
export interface AddNotebookRequest {
  "notebook-name": string;
}
export interface NotebookTableColumnRequest {
  name: string;
  "column-type": string;
}
export interface UpdateNotebookRequest {
  "notebook-id": string;
  "table-columns"?: NotebookTableColumnRequest[];
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
  public async listSupportedColumns(): Promise<NotebookTableColumn[]> {
    const request = await fetch(`${API_ROOT}/notebook-supported-columns`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return (await request.json()).columns;
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
  public async updateOne(notebook: UpdateNotebookRequest) {
    const request = await fetch(
      `${API_ROOT}/notebook/${notebook["notebook-id"]}/edit`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notebook),
        credentials: "include",
      }
    );
    const resp = await request.json();
    console.log("update notebook response", resp);
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
