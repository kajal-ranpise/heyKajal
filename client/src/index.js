import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './app/store';
import App from './app';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "swiper/css";                 // ✅ fixed import
import "swiper/css/navigation";      // optional
import "swiper/css/pagination";      // optional
import "glightbox/dist/css/glightbox.min.css";
import "./assets/css/main.css";   


const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);