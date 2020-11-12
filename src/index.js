import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider as ShopifyProvider } from "@shopify/polaris";
import { ApolloProvider } from "@apollo/client";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import client from "./graphql/client";
import storeAndPersistor from "./state/store";
import * as serviceWorker from "./serviceWorker";

const { store, persistor } = storeAndPersistor();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ApolloProvider client={client}>
          <ShopifyProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ShopifyProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
