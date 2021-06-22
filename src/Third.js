import React from "react";
import firebase from "firebase";
import { Context } from ".";
import { Button } from "@material-ui/core";

export function Third() {
  const { auth } = React.useContext(Context);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const logIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  const logOut = () => {
    auth.signOut();
  }

  return (
    <div className="contentWrapper">
      <h2>Firebase Auth</h2>
      {user ? (
        <>
          <p>{user.displayName}</p>
          <Button
            variant="contained"
            color="primary"
            component="label"
            onClick={logOut}
          >
            Выйти
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component="label"
          onClick={logIn}
        >
          Войти с помощью Google
        </Button>
      )}
    </div>
  );
}

export default Third;
