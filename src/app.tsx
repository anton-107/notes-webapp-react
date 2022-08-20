import * as React from "react";
import { useEffect, useState } from "react";
import { AuthService } from "./auth/auth-service";
import { LoginForm } from "./auth/login-form";
import "./main.css";

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
    <div id="app-root">
      <div className="layout">
        {isAuthenticated && (
          <div className="vertical-menu">
            <h1 className="menu-block menu-header">Notes app</h1>
            <ul className="menu-links">
              <li>
                <a href="#">Notebooks</a>
              </li>
              <li>
                <a href="#">People</a>
              </li>
            </ul>
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
            <div className="content-block" data-testid="greeting">
              Hello, {userName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
