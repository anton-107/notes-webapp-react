import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Notebook, NotebooksService } from "./notebooks-service";

export function SingleNotebookPage(): React.ReactElement {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const { notebookID } = useParams();

  const loadNotebook = async (notebookID: string) => {
    const notebooksService = new NotebooksService();
    const notebook = await notebooksService.getOne(notebookID);
    setNotebook(notebook);
  };

  useEffect(() => {
    loadNotebook(notebookID);
  }, []);

  return (
    <div className="content-block">
      <Link to="/notebooks">← notebooks</Link>
      {!notebook && <div>Loading...</div>}
      {notebook && <h1>{notebook.name}</h1>}
    </div>
  );
}
