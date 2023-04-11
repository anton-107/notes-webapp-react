/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { NotebookTableRow } from "../../../../src/notebooks/notebook-views/notebook-table/table-row";
import { NotebookTableColumn } from "../../../../src/notebooks/notebooks-service";
import { Note } from "../../../../src/notes/notes-service";

describe("Table row component", () => {
  it("should render an empty list without an error", async () => {
    const note: Note = {
      id: "file-1",
      content: "/src/index-file",
      type: { type: "note" },
      notebookID: "repo-1",
      extensionProperties: {
        contributors: [] as unknown as string,
      },
    };

    const tableColumns: NotebookTableColumn[] = [
      {
        name: "Contributors",
        columnType: "contributors",
        valueType: "list-of-objects",
        valueSource: "extensionProperties",
      },
    ];

    const component = render(
      <BrowserRouter>
        <table>
          <tbody>
            <NotebookTableRow
              note={note}
              tableColumns={tableColumns}
              supportedColumnsMap={{}}
              activeCellToEdit={null}
              onChangeActiveCellToEdit={null}
              onCellSaved={null}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("table-cell-file-1-contributors")
    ).toHaveTextContent("0 item(s)");

    // verify tooltip is shown:
    const tooltipTrigger = screen.getAllByRole("tooltip-trigger")[0];
    fireEvent.mouseEnter(tooltipTrigger);
    await waitFor(() => screen.getAllByRole("tooltip"));

    component.unmount();
  });
  it("should display a list of objects with a popover", async () => {
    const note: Note = {
      id: "file-1",
      content: "/src/index-file",
      type: { type: "note" },
      notebookID: "repo-1",
      extensionProperties: {
        contributors: [
          { name: "Contributor 1" },
          { name: "Contributor 2" },
          { name: "Contributor 3" },
        ] as unknown as string,
      },
    };

    const tableColumns: NotebookTableColumn[] = [
      {
        name: "Contributors",
        columnType: "contributors",
        valueType: "list-of-objects",
        valueSource: "extensionProperties",
      },
    ];

    const component = render(
      <BrowserRouter>
        <table>
          <tbody>
            <NotebookTableRow
              note={note}
              tableColumns={tableColumns}
              supportedColumnsMap={{}}
              activeCellToEdit={null}
              onChangeActiveCellToEdit={null}
              onCellSaved={null}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );
    expect(
      screen.getByTestId("table-cell-file-1-contributors")
    ).toHaveTextContent("3 item(s)");

    // verify tooltip is shown:
    const tooltipTrigger = screen.getAllByRole("tooltip-trigger")[0];
    fireEvent.mouseEnter(tooltipTrigger);
    await waitFor(() => screen.getAllByRole("tooltip"));

    component.unmount();
  });
});
