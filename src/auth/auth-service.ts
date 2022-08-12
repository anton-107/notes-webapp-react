interface SignInResult {
  isAuthenticated: boolean;
}

export class AuthService {
  public async signIn(
    username: string,
    password: string
  ): Promise<SignInResult> {
    const request = await fetch("http://localhost:3000/signin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user-login": username,
        "user-password": password,
      }),
    });
    const resp = await request.json();
    console.log("signin response", resp);

    return {
      isAuthenticated: false,
    };
  }
}
