import React, { useState } from "react";
import '@epicapp/styles/globals.css';
import AppContext from '@epicapp/context/AppContext';
import userObject from '@epicapp/context/userObject';
import { withRouter } from "next/router";


function App({ Component, pageProps }) {
  const [context, setContext] = useState(userObject);
  return (
    <AppContext.Provider value={[context, setContext]}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default withRouter(App);