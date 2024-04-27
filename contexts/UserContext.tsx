import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  getRedirectResult,
} from "firebase/auth";

import { firebaseApp } from "@/firebaseClient";
import { createUserDBEntry } from "@/components/util/userDBFunctions";
import { set } from "firebase/database";

// User context properties shared with components that subscribe to this context
interface UserContextProps {
  uid: string;
  email: string | null;
  profileURL: string | null;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

// Initialize the context
const UserContext = createContext<UserContextProps>;

// Create a user context provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = (props: UserProviderProps) => {
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [profileURL, setProfileURL] = useState<string | null>(null);

  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  // Handle sign ins and sign outs
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider).catch((error: any) => {
      console.warn("Google authentication error--", error);
      return;
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUid("");
    setEmail("");
    setProfileURL("");
  };

  // Set up a listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User authentication state changed");

      if (user) {
        // User is signed in, so update the user context properties
        setUid(user.uid);
        setEmail(user.email);
        setProfileURL(user.photoURL);

        // Create a user database entry
        if (uid && email) {
          await createUserDBEntry(uid, email, profileURL);
          console.log("User Signed in ");
        } else {
          console.log("User not signed in");
        }
      } else {
        // No user is signed in, so clear the user context properties
        setUid("");
        setEmail(null);
        setProfileURL(null);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
};
