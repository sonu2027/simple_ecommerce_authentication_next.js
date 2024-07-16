import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store'; 

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={GeistSans.className}>
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;