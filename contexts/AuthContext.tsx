"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";

import { firebaseApp } from "@/firebaseClient";
import { createUserDBEntry } from "@/components/util/userDBFunctions";
import { User } from "firebase/auth";

// Authentication context properties shared with components that subscribe to this context
interface AuthContextProps {
  user: User | null;
  auth: Auth;
  loading: boolean;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

// Initialize the context
// NOTE: authentication context should only be accessed through the useAuth hook below
const AuthContext = createContext<AuthContextProps>({
  user: null,
  auth: getAuth(firebaseApp),
  loading: true,
  handleSignIn: async () => {},
  handleSignOut: async () => {},
});

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create an authentication context provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  // Stateful properties
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the authentication context properties
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  // Handle sign ins and sign outs
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider).catch((error: any) => {
      console.warn("Google authentication sign-in error: ", error);
      return;
    });
  };

  const handleSignOut = async () => {
    await signOut(auth).catch((error: any) => {
      console.warn("Google sign-out error: ", error);
      return;
    });
  };

  // Set up a listener for authentication state changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function that cleans up the listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User authentication state changed");

      if (user) {
        setUser(user);
        await createUserDBEntry(
          user.uid,
          user.email ? user.email : "",
          user.photoURL ? user.photoURL : ""
        );
      } else {
        setUser(null);
        console.log("User not signed in");
      }

      setLoading(false);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, auth, loading, handleSignIn, handleSignOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
