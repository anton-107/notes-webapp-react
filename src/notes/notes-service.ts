import { API_ROOT } from "../environment";

type NoteType = "note" | "notes-container";

export interface NoteAttachment {
  id: string;
  name: string;
  objectKey: string;
  createdAt: string;
}

type ExtensionProperties = { [key: string]: string };

export type NoteContent = string;

export interface Note {
  id: string;
  content: NoteContent;
  type: { type: NoteType };
  notebookID: string;
  extensionProperties?: ExtensionProperties;
  columnValues?: { [key: string]: string };
}
export interface NoteRequest {
  "note-type": NoteType;
  "notebook-id": string;
  "note-content": string;
  "note-section": string;
  "note-manual-order"?: number;
}
export interface EditNoteRequest extends NoteRequest {
  "note-id": string;
}
export interface PartialEditNoteRequest {
  "note-id": string;
  "table-columns"?: { [columnType: string]: string };
}
export interface UpdateNoteSectionRequest {
  "note-id": string;
  "note-section": string;
  "note-manual-order": number;
}

export class NotesService {
  public async listAllForNotebook(notebookID: string): Promise<Note[]> {
    const request = await fetch(`${API_ROOT}/notebook/${notebookID}/note`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resp = await request.json();
    return resp.notes;
  }
  public async listAttachments(noteID: string): Promise<NoteAttachment[]> {
    const request = await fetch(`${API_ROOT}/note/${noteID}/attachment`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resp = await request.json();
    return resp.attachments;
  }
  public async addNote(note: NoteRequest): Promise<Note> {
    const request = await fetch(`${API_ROOT}/note`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("add note response", resp);
    return resp;
  }
  public async deleteNote(noteID: string): Promise<void> {
    const request = await fetch(`${API_ROOT}/note/delete`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "note-id": noteID }),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("dlete note response", resp);
    return resp;
  }
  public async editNote(
    note: EditNoteRequest | PartialEditNoteRequest | UpdateNoteSectionRequest
  ): Promise<Note> {
    const request = await fetch(`${API_ROOT}/note/${note["note-id"]}/edit`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("edit note response", resp);
    return resp;
  }
  public async moveNoteToSection(
    note: UpdateNoteSectionRequest
  ): Promise<Note> {
    return await this.editNote(note);
  }
}
