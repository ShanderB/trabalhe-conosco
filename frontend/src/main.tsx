import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import { store } from './app/store';
import { ENABLE_MOCKS } from './config/env';
import { GlobalStyle } from './theme/GlobalStyle';
import { theme } from './theme/theme';

async function enableMockingIfNeeded() {
  if (!ENABLE_MOCKS) return;
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

enableMockingIfNeeded().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConfigProvider locale={ptBR} theme={{ token: { colorPrimary: theme.colors.primary, borderRadius: 8 } }}>
            <GlobalStyle />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <App />
            </BrowserRouter>
          </ConfigProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  );
});
