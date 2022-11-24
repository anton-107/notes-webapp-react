import * as React from "react";

import { AuthService } from "./auth-service";
interface UserMenuProps {
  userName: string;
  onSignOut: () => void;
}

export function UserMenu(props: UserMenuProps): React.ReactElement {
  const authService = new AuthService();
  const signOut = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    console.log("do sign out");
    await authService.signOut();
    props.onSignOut();
  };
  return (
    <div>
      <span data-testid="user-menu-greeting">
        Signed in as {props.userName}.
      </span>{" "}
      &nbsp;
      <span>
        <a href="#" data-testid="signout-link" onClick={signOut}>
          Sign out
        </a>
      </span>
    </div>
  );
}
