'use client'

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db, auth } from "@/config/firebase";
import { AuthContext } from "@/config/context";

import { Button } from "@heroui/button";
// import { setPersistence, browserLocalPersistence } from "firebase/auth";



type Props = {}

export default function Access() {
  const [ username, setUsername ] = useState("");
  const { user, userprofile } = useContext( AuthContext );
  
  // setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  
  const router = useRouter();

  


  // Google redirect function
  async function handleAccessWithGoogle() {
    // console.log("press")
    try {
      await signInWithPopup(auth, provider)
      .then( res => console.log("Login successful") )
    } catch (error) {
      console.error(error);
    }
  };

  // Form submit
  function handleFormSubmit(e:any) {
    e.preventDefault();

    const docRef = doc( db, "users", user.uid );
    const userData = {
      username,
      uid: user.uid,
      userCreated: serverTimestamp(),
    };

    setDoc( docRef, userData )
      .then( () => {
        console.log("User profile created successfully: ");
        
        router.push("/");
      } )
      .catch( err => console.error( err ) );

  };

  


  return (
    <div>
      { user && userprofile ?
        <section>
          <p>User: {user.email}</p>
          <p>Username: {userprofile.username}</p>
        </section>
      : user ?
        <section>
          <p>User: {user.email}</p>
          <form onSubmit={handleFormSubmit} >
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <Button color="success" type="submit" >Continue</Button>
          </form>
        </section>
        :
        <section>
          <Button onPress={handleAccessWithGoogle} >Sign in with google</Button>
        </section>
      }
    </div>
  )
}

