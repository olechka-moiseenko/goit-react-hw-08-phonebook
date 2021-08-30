import { Switch } from "react-router-dom";
import SingUp from "../src/SingUp/SignUp";
import SignIn from "../src/SignIn/SignIn";
import ContactForm from "../src/ContactForm/ContactForm";
import React, { Suspense, useEffect } from "react";
import PrivateRoute from "../src/PrivateRoute";
import PublicRoute from "../src/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "./redux/slices/authentication/auth-selectors";
import aut_operation from "./redux/slices/authentication/aut_operation";

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(aut_operation.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <h2>Loading...</h2>
      ) : (
        <Switch>
          <Suspense fallback="Loading...">
            <PublicRoute exact path="/" redirectTo="/contactform" restricted>
              <SingUp />
            </PublicRoute>
            <PublicRoute
              exact
              path="/singin"
              redirectTo="/contactform"
              restricted
            >
              <SignIn />
            </PublicRoute>
            <PrivateRoute path="/contactform">
              <ContactForm />
            </PrivateRoute>
          </Suspense>
        </Switch>
      )}
    </>
  );
}

export default App;
