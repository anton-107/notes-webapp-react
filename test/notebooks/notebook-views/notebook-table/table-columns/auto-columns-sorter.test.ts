import { sortKeys } from "../../../../../src/notebooks/notebook-views/notebook-table/table-columns/auto-columns-sorter";

describe("Auto columns sorter", () => {
  it("should given a list of object keys sort them in alphabetic order", () => {
    const obj = {
      d: 1,
      z: 1,
      f: 1,
      a: 1,
    };
    const columns = sortKeys(Object.keys(obj));
    expect(columns[0]).toBe("a");
    expect(columns[1]).toBe("d");
    expect(columns[2]).toBe("f");
    expect(columns[3]).toBe("z");
  });
  it('should move key called "name" to the first position', () => {
    const obj = {
      d: 1,
      z: 1,
      f: 1,
      name: 1,
      a: 1,
    };
    const columns = sortKeys(Object.keys(obj));
    console.log("columns", columns);
    expect(columns[0]).toBe("name");
    expect(columns[1]).toBe("a");
    expect(columns[2]).toBe("d");
    expect(columns[3]).toBe("f");
    expect(columns[4]).toBe("z");
  });
  it('should move keys starting with "first" and "last" to the beginning of the list after name', () => {
    const obj = {
      d: 1,
      lastDate: 1,
      z: 1,
      f: 1,
      firstDate: 1,
      name: 1,
      a: 1,
    };
    const columns = sortKeys(Object.keys(obj));
    console.log("columns", columns);
    expect(columns[0]).toBe("name");
    expect(columns[1]).toBe("firstDate");
    expect(columns[2]).toBe("lastDate");
    expect(columns[3]).toBe("a");
    expect(columns[4]).toBe("d");
    expect(columns[5]).toBe("f");
    expect(columns[6]).toBe("z");
  });
});
