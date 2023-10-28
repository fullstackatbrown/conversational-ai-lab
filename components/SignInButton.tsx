import React, { Dispatch, SetStateAction } from "react";

export default function SignInButton({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  return <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Sign In</button>;
}
