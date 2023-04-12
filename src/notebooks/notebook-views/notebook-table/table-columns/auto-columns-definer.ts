import { sortKeys } from "./auto-columns-sorter";

type Row = { [key: string]: string };
type ValueRenderer = (value: string) => string;

export interface TableColumn {
  name: string;
  key: string;
  valueRenderer: ValueRenderer;
}

const idRenderer: ValueRenderer = (value) => {
  return value;
};

const timestampToYearMonthRenderer: ValueRenderer = (value) => {
  const date = new Date(parseInt(value) * 1000);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

export function defineColumns(rows: Row[]): TableColumn[] {
  if (rows.length <= 0) {
    return [];
  }
  const refObject = rows[0];
  const columns = Object.keys(refObject);
  const keys = sortKeys(columns);
  return keys.map((k) => {
    let valueRenderer = idRenderer;

    if (k.toLowerCase().includes("timestamp")) {
      valueRenderer = timestampToYearMonthRenderer;
    }

    return {
      name: k,
      key: k,
      valueRenderer,
    };
  });
}
