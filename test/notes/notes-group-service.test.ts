import { NotesInSectionService } from "../../src/notes/notes-group-service";

describe("NotesInSectionService", () => {
  describe("getOrderAfterInsert", () => {
    it("should return null if requested section does not exist", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [],
        },
      ]);
      const order = service.getOrderAfterInsert("section-2", 0);
      expect(order).toBe(null);
    });
    it("should return STEP if requested section has no notes", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 0);
      expect(order).toBe(100);
    });
    it("should return STEP when inserting at 0th position if first note in section does not have a manual order set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: {
                section: "section-1",
                manualOrder: undefined,
              },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 0);
      expect(order).toBe(100);
    });
    it("should return STEP when inserting at 0th position if first note in section does not have extension properties set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 0);
      expect(order).toBe(100);
    });
    it("should return half of the manual order when inserting at 0th position", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: { section: "section-1", manualOrder: 50 },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 0);
      expect(order).toBe(25);
    });
    it("should return STEP when inserting at last position if the last note in section does not have a manual order set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: {
                section: "section-1",
                manualOrder: undefined,
              },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(100);
    });
    it("should return STEP when inserting at last position if the last note in section does not have extension properties set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(100);
    });
    it("should return last order + STEP when inserting at last position", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: { section: "section-1", manualOrder: 200 },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(300);
    });
    it("should return STEP when inserting between cards with no manual order set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: {
                section: "section-1",
                manualOrder: undefined,
              },
            },
            {
              id: "note-2",
              content: "Note 2",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: {
                section: "section-1",
                manualOrder: undefined,
              },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(100);
    });
    it("should return STEP when inserting between cards with no extension properties set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
            },
            {
              id: "note-2",
              content: "Note 2",
              type: { type: "note" },
              notebookID: "notebook-1",
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(100);
    });
    it("should return a number between cards when inserting between cards with manual order set", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: { section: "section-1", manualOrder: 50 },
            },
            {
              id: "note-2",
              content: "Note 2",
              type: { type: "note" },
              notebookID: "notebook-1",
              extensionProperties: { section: "section-1", manualOrder: 100 },
            },
          ],
        },
      ]);
      const order = service.getOrderAfterInsert("section-1", 1);
      expect(order).toBe(75);
    });
  });
  describe("getNextOrderInSection", () => {
    it("should return STEP if no section is found", () => {
      const service = new NotesInSectionService();
      const order = service.getNextOrderInSection("section-1");
      expect(order).toBe(100);
    });
    it("should return STEP if section has no notes", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [],
        },
      ]);
      const order = service.getNextOrderInSection("section-1");
      expect(order).toBe(100);
    });
    it("should return STEP if last note has no extension properties", () => {
      const service = new NotesInSectionService();
      service.setSections([
        {
          sectionID: "section-1",
          sectionName: "Section 1",
          notes: [
            {
              id: "note-1",
              content: "Note 1",
              type: { type: "note" },
              notebookID: "notebook-1",
            },
          ],
        },
      ]);
      const order = service.getNextOrderInSection("section-1");
      expect(order).toBe(100);
    });
  });
});
