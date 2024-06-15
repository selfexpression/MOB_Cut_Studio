import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';

import { store } from './slices/index';
import { App } from './components/App';
import resources from './locales/index';
import reportWebVitals from './reportWebVitals';
import { FirestoreContext } from './contexts/index';

export const runApp = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const mountNode = document.getElementById('root') as HTMLElement;
  const root = ReactDOM.createRoot(mountNode);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <FirestoreContext.Provider value={db}>
          <YMaps
            query={{
              ns: 'use-load-option',
              load: 'package.full',
            }}
          >
            <ParallaxProvider>
              <App />
            </ParallaxProvider>
          </YMaps>
        </FirestoreContext.Provider>
      </Provider>
    </React.StrictMode>,
  );
};

reportWebVitals();
