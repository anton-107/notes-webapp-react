import * as React from "react";
import "./login-form.css";

export function LoginForm(): React.ReactElement {
  return (
    <div className="centric-form">
      <h1>Sign in to NotesApp</h1>
      <form method="post" action="#" className="login-form">
        <label>
          <span className="form-label">E-mail:</span>
          <input
            name="user-login"
            data-testid="user-login"
            className="form-input"
          />
        </label>
        <label>
          <span className="form-label">Password:</span>
          <input
            name="user-password"
            data-testid="user-password"
            type="password"
            className="form-input"
          />
        </label>
        <input type="submit" value="Sign in" className="form-button" />
      </form>
    </div>
  );
}
