/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { NotebookFileTreeComponent } from "../../../src/notebooks/notebook-views/notebook-filetree.component";

describe("Notebook file tree component", () => {
  beforeAll(() => {
    fetchMock.mockResponse(async (req) => {
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: [
            {
              content: "/src/file-1",
              id: "note-1",
              extensionProperties: { manualOrder: 100 },
            },
            {
              content: "/src/file-2",
              id: "note-2",
              extensionProperties: { manualOrder: 200 },
            },
            {
              content: "/config-file",
              id: "note-3",
              extensionProperties: { manualOrder: 300 },
            },
          ],
        });
      }
    });
  });

  it("should show a stub message until this component is implemented", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookFileTreeComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("file-config-file"));
    expect(screen.getByTestId("file-config-file")).toHaveTextContent(
      "config-file"
    );
    component.unmount();
  });
});
