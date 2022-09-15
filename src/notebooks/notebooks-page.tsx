import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Notebook, NotebooksService } from "./notebooks-service";
import "./notebook-page.css";

export function NotebooksPage(): React.ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [notebooks, setNotebooks] = useState([]);

  const loadNotebooks = async () => {
    setLoading(true);
    const notebooksService = new NotebooksService();
    const notebooks = await notebooksService.listAll();
    setLoading(false);
    setNotebooks(notebooks);
  };

  useEffect(() => {
    loadNotebooks();
  }, []);
  return (
    <div className="content-block">
      <h1 data-testid="notebooks-page-header">Notebooks</h1>
      {isLoading && <div>Loading...</div>}
      {notebooks.map((n: Notebook) => {
        return (
          <div data-testid={`notebook-${n.id}`} key={`notebook-${n.id}`}>
            <Link to={`/notebook/${n.id}`} className="notebook-link">
              <div className="notebook-item">
                <div className="notebook-cover"></div>
                <div className="notebook-title">{n.name}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
