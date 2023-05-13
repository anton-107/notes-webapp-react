import { groupNotesAsFileTree } from "../../src/notes/notes-filetree-service";

describe("groupNotesAsFileTree", () => {
  const notes = [
    { content: "/file0" },
    { content: "/folder1/file1" },
    { content: "/folder1/file2" },
    { content: "/folder2/file1" },
    { content: "/folder3/file1" },
    { content: "/folder3/file2" },
    { content: "/file3" },
  ];

  it("should return an empty array when notes are empty", () => {
    expect(groupNotesAsFileTree([], "/")).toEqual([]);
  });

  it("should group notes by folder when current folder is root", () => {
    const result = groupNotesAsFileTree(notes, "/");
    expect(result).toHaveLength(5);
    expect(result[0].name).toBe("folder1");
    expect(result[0].isFolder).toBe(true);
    expect(result[1].name).toBe("folder2");
    expect(result[1].isFolder).toBe(true);
    expect(result[2].name).toBe("folder3");
    expect(result[2].isFolder).toBe(true);
    expect(result[3].name).toBe("file0");
    expect(result[3].isFolder).toBe(false);
    expect(result[4].name).toBe("file3");
    expect(result[4].isFolder).toBe(false);
  });

  it("should group notes by folder and subfolder when current folder is 'folder1'", () => {
    const result = groupNotesAsFileTree(notes, "/folder1");
    expect(result).toContainEqual({ name: "file1", isFolder: false });
    expect(result).toContainEqual({ name: "file2", isFolder: false });
    expect(result).toHaveLength(2);
  });

  it("should group notes by folder and subfolder when current folder is 'folder3'", () => {
    const result = groupNotesAsFileTree(notes, "/folder3");
    expect(result).toContainEqual({ name: "file1", isFolder: false });
    expect(result).toContainEqual({ name: "file2", isFolder: false });
    expect(result).toHaveLength(2);
  });
});
