import { groupNotesAsFileTree } from "../../src/notes/notes-filetree-service";

describe("groupNotesAsFileTree", () => {
  const notes = [
    { content: "/folder1/file1" },
    { content: "/folder1/file2" },
    { content: "/folder2/file1" },
    { content: "/folder3/file1" },
    { content: "/folder3/file2" },
  ];

  it("should return an empty array when notes are empty", () => {
    expect(groupNotesAsFileTree([], "/")).toEqual([]);
  });

  it("should group notes by folder when current folder is root", () => {
    const result = groupNotesAsFileTree(notes, "/");
    expect(result).toContainEqual({ name: "folder1" });
    expect(result).toContainEqual({ name: "folder2" });
    expect(result).toContainEqual({ name: "folder3" });
    expect(result).toHaveLength(3);
  });

  it("should group notes by folder and subfolder when current folder is 'folder1'", () => {
    const result = groupNotesAsFileTree(notes, "/folder1");
    expect(result).toContainEqual({ name: "file1" });
    expect(result).toContainEqual({ name: "file2" });
    expect(result).toHaveLength(2);
  });

  it("should group notes by folder and subfolder when current folder is 'folder3'", () => {
    const result = groupNotesAsFileTree(notes, "/folder3");
    expect(result).toContainEqual({ name: "file1" });
    expect(result).toContainEqual({ name: "file2" });
    expect(result).toHaveLength(2);
  });
});
