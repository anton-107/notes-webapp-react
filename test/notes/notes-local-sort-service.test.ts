import { sortNotes } from "../../src/notes/notes-local-sort-service";

describe("Notes local sort service", () => {
  it("should trate not-a-number values as zero", async () => {
    const sortedNotes = sortNotes(
      [
        {
          id: "note-1",
          notebookID: "nb1",
          content: "",
          type: { type: "note" },
          extensionProperties: { testColumn: "1" },
        },
        {
          id: "note-2",
          notebookID: "nb1",
          content: "",
          type: { type: "note" },
          extensionProperties: { testColumn: "a" },
        },
        {
          id: "note-3",
          notebookID: "nb1",
          content: "",
          type: { type: "note" },
          extensionProperties: { testColumn: "2" },
        },
      ],
      {
        name: "Test column",
        valueSource: "extensionProperties",
        valueType: "number",
        columnType: "testColumn",
      },
      1
    );
    expect(sortedNotes[0].id).toBe("note-2");
    expect(sortedNotes[1].id).toBe("note-1");
    expect(sortedNotes[2].id).toBe("note-3");
  });
});
