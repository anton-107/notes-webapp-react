import { defineColumns } from "../../../../../src/notebooks/notebook-views/notebook-table/table-columns/auto-columns-definer";

describe("defineColumns", () => {
  test("returns an empty array when rows is empty", () => {
    expect(defineColumns([])).toEqual([]);
  });

  test("returns TableColumn array with correct name, key, and valueRenderer when rows is not empty", () => {
    const rows = [
      { id: "1", name: "John", age: "30", createdTimestamp: "1623982640" },
      { id: "2", name: "Jane", age: "25", createdTimestamp: "1623982740" },
      { id: "3", name: "Bob", age: "40", createdTimestamp: "1623982840" },
    ];

    const columns = defineColumns(rows);

    expect(columns[0].name).toEqual("name");
    expect(columns[1].name).toEqual("age");
    expect(columns[2].name).toEqual("createdTimestamp");

    expect(columns[0].valueRenderer("John")).toBe("John");
    expect(columns[1].valueRenderer("30")).toBe("30");
    expect(columns[2].valueRenderer("1623982640")).toBe("2021/06");
  });

  test('uses timestampToYearMonthRenderer as valueRenderer for columns containing "timestamp"', () => {
    const rows = [{ createdTimestamp: "1623982640" }];
    const columns = defineColumns(rows);

    expect(columns[0].valueRenderer("1623982640")).toBe("2021/06");
  });
});
