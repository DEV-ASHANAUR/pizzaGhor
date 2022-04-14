import Layouts from '../components/Layouts'
import '../styles/globals.css'
import Head from 'next/head';
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

        <script src="https://kit.fontawesome.com/dce6f93502.js" crossorigin="anonymous"></script>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layouts>
            <Component {...pageProps} />
          </Layouts>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
