import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notebook, NotebooksService } from "../notebooks-service";

export function NotebookOverviewComponent(): React.ReactElement {
  const { notebookID } = useParams();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };
  useEffect(() => {
    loadNotebook(notebookID);
  }, [location]);

  return (
    <div className="content-block" data-testid="notebook-overview-view">
      {notebook && (
        <div>
          <div data-testid="notebook-info-createdat">
            This notebook was created at: {notebook.createdAt}
          </div>
          <div data-testid="notebook-info-updatedat">
            This notebook was last updated at: {notebook.updatedAt}
          </div>
        </div>
      )}
    </div>
  );
}
