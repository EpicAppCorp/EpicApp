// import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import '@epicapp/styles/globals.css';
// import AppContext from '@epicapp/context/AppContext';
// import userObject from '@epicapp/context/userObject';
import { withRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  // const [context, setContext] = useState(userObject);
  return (
    // <AppContext.Provider value={[context, setContext]}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    // </AppContext.Provider>
  );
}
