import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';

import { store } from './slices/index';
import { App } from './components/App';
import resources from './locales/index';
import reportWebVitals from './reportWebVitals';

const runApp = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const mountNode = document.getElementById('root') as HTMLElement;
  const root = ReactDOM.createRoot(mountNode);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <YMaps query={{
          ns: 'use-load-option',
          load: 'package.full',
        }}
        >
          <ParallaxProvider>
            <App />
          </ParallaxProvider>
        </YMaps>
      </Provider>
    </React.StrictMode>,
  );
};

export default runApp;

reportWebVitals();
