import * as React from "react";
import { FormEvent, useState } from "react";
import { AuthService } from "./auth-service";
import "./login-form.css";

export function LoginForm(): React.ReactElement {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const service = new AuthService();
    await service.signIn(login, password);
    console.log("submit form", login, password);
  };

  return (
    <div className="centric-form">
      <h1>Sign in to NotesApp</h1>
      <form
        method="post"
        action="#"
        className="login-form"
        onSubmit={submitForm}
        data-testid="login-form"
      >
        <label>
          <span className="form-label">E-mail:</span>
          <input
            name="user-login"
            data-testid="user-login"
            className="form-input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label>
          <span className="form-label">Password:</span>
          <input
            name="user-password"
            data-testid="user-password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign in" className="form-button" />
      </form>
    </div>
  );
}
