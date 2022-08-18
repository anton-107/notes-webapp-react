import { API_ROOT } from "../environment";

interface SignInResult {
  isAuthenticated: boolean;
}
interface AuthenticationResult {
  isAuthenticated: boolean;
  username: string;
}

export class AuthService {
  public async signIn(
    username: string,
    password: string
  ): Promise<SignInResult> {
    const request = await fetch(`${API_ROOT}/signin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user-login": username,
        "user-password": password,
      }),
      credentials: "include",
    });
    const resp = await request.json();
    console.log("signin response", resp);

    return {
      isAuthenticated: false,
    };
  }
  public async checkAuthentication(): Promise<AuthenticationResult> {
    const request = await fetch(`${API_ROOT}/whoami`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("[checkAuthentication] request", request);
    const resp = await request.json();
    console.log("whoami response", resp);

    return resp;
  }
}
