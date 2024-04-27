"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { user, handleSignIn, handleSignOut } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  async function redirectProfile() {
    // use next router to redirect to profile page
    router.push("/editProfile");
  }

  return (
    <div className="flex flex-col gap-5">
      {isLoading && <div>Loading...</div>}
      <button onClick={() => handleSignIn()}>
        {user ? "Welcome, " + user.email + "!" : "Sign in"}
      </button>
      <button onClick={() => handleSignOut()}>Sign Out</button>
      {user && <button onClick={() => redirectProfile()}>Profile</button>}
    </div>
  );
}
