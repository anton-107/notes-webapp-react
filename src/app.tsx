import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthService } from "./auth/auth-service";
import { LoginForm } from "./auth/login-form";
import { UserMenu } from "./auth/user-menu";
import "./main.css";
import { LeftMenuLinks } from "./navigation/left-menu-links";
import { NotebooksLeftMenu } from "./navigation/notebooks-left-menu";
import { NotebookBoardComponent } from "./notebooks/notebook-views/notebook-board.component";
import { NotebookListComponent } from "./notebooks/notebook-views/notebook-list.component";
import { NotebookOverviewComponent } from "./notebooks/notebook-views/notebook-overview.component";
import { NotebooksPage } from "./notebooks/notebooks-page";
import { SingleNotebookPage } from "./notebooks/single-notebook-page";
import { PeoplePage } from "./people/people-page";

export function App(): React.ReactElement {
  const authService = new AuthService();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  const checkCurrentUser = async () => {
    setIsCheckingAuth(true);
    const resp = await authService.checkAuthentication();
    setIsAuthenticated(resp.isAuthenticated);
    setUserName(resp.username);
    setIsCheckingAuth(false);
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <div id="app-root">
        <div className="layout">
          {isAuthenticated && (
            <div className="vertical-menu">
              <h1 className="menu-block menu-header">Notes app</h1>
              <LeftMenuLinks />
              <NotebooksLeftMenu />
            </div>
          )}
          <div className="content">
            {!isCheckingAuth && !isAuthenticated && (
              <div className="content-block" data-testid="login-form-wrapper">
                <LoginForm onSignIn={checkCurrentUser} />
              </div>
            )}
            {isCheckingAuth && <div className="content-block">Loading...</div>}
            {!isCheckingAuth && isAuthenticated && (
              <div className="top-bar">
                <div className="top-bar-section"></div>
                <div className="top-bar-section-side" data-testid="greeting">
                  <UserMenu userName={userName} onSignOut={checkCurrentUser} />
                </div>
              </div>
            )}
            {!isCheckingAuth && isAuthenticated && (
              <Routes>
                <Route path="/" element={<NotebooksPage />} />
                <Route path="notebooks" element={<NotebooksPage />} />
                <Route
                  path="notebook/:notebookID"
                  element={<SingleNotebookPage />}
                >
                  <Route path="" element={<NotebookOverviewComponent />} />
                  <Route path="list" element={<NotebookListComponent />} />
                  <Route path="board" element={<NotebookBoardComponent />} />
                </Route>
                <Route path="people" element={<PeoplePage />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
