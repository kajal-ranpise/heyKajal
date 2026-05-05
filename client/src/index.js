import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './app/store';
import App from './app';
import { ThemeProvider } from './context/ThemeContext';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "glightbox/dist/css/glightbox.min.css";
import "./assets/css/main.css";
import "./assets/css/premium.css";

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);