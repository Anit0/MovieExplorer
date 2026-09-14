import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LibraryProvider } from './context/LibraryContext';
import '@fontsource-variable/inter';
import '@fontsource-variable/sora';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LibraryProvider>
          <App />
        </LibraryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
