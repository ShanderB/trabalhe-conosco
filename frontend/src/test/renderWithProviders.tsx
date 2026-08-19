import type { ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { apiSlice } from '../services/apiSlice';
import { theme } from '../theme/theme';

export function renderWithProviders(ui: ReactElement, { route = '/' }: { route?: string } = {}) {
  const store = configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter
          initialEntries={[route]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
}
