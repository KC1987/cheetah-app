import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from '@/config/firebase';
import { doc, getDoc } from "firebase/firestore";
 
// user context
export const AuthContext = createContext();

// user provider
export function AuthProvider({ children }) {

  const [ user, setUser ] = useState(null);
  const [ userprofile, setUserprofile ] = useState(null);

  // Retrieve google user on auth change
  useEffect( () => {
    onAuthStateChanged( auth, (currentUser) => {
      if (currentUser) {
        // User found
        console.log("User found, retrieving user profile...");
        // console.log(currentUser)
        // Look up user profile
        const docRef = doc( db, "users", currentUser.uid  );
        getDoc(docRef).then( profile => {
          if ( profile.exists() ) {
            // user profile found
            // ...
            console.log("User profile found", profile.data());
            setUserprofile( profile.data() );
          } else {
            // user profile not found
            // ...
            console.log("User profile not found")
          }
        }
        )



        setUser(currentUser);
      } else {
        // No user found
        console.log("No user found")
      }
    } );
  }, [] );



  return (
    <AuthContext.Provider value={{ user, userprofile }} >
      { children }
    </AuthContext.Provider>
  )
}
