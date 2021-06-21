import React from "react";
import firebase from "firebase";
import { Context } from ".";
import { Button } from "@material-ui/core";

export function Third() {
  const { auth } = React.useContext(Context);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

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
            onClick={() => {
              auth.signOut();
            }}
          >
            Выйти
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component="label"
          onClick={() => {
            var provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).then(function (result) {
              console.log("dd", result);
            });
          }}
        >
          Войти с помощью Google
        </Button>
      )}
    </div>
  );
}

export default Third;
