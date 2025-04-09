import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { Toaster } from 'react-hot-toast';
// import usePreventDevTools from "@/hooks/devToolsPreventionHook";

export default function App({ Component, pageProps }) {
  // usePreventDevTools();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
