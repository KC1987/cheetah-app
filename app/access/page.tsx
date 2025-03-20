'use client'

import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@heroui/button";
import { useEffect } from "react";

type Props = {}

export default function Access() {
  const provider = new GoogleAuthProvider();

  // Get auth response
  useEffect( () => {
    async function tryCallback() {
      try {
        await getRedirectResult(auth)
        .then( res => {
          if (res) {
            // user authenticifated successfuly
            const credential = GoogleAuthProvider.credentialFromResult(res);
            const token = credential?.accessToken;

            const user = res?.user;

            console.log(res);
          } else {
            // no user found
            console.log("no user found")
          } } )
        .catch( err => console.error(err) )
      } catch (err) {
        console.error( err );
      }
    };

    tryCallback();
    }, [ ] )
  


  // Google redirect function
  async function handleAccessWithGoogle() {
    // console.log("press")
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h1 className="text-xl" >Access</h1>
      <Button onPress={ handleAccessWithGoogle } >Access With Google</Button>
    </div>
  )
}

