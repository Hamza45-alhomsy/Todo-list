import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Debug helper to log <img> elements and add a visible outline while troubleshooting image loading
import "./debug-images";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import store from "./redux/store/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>,
);
