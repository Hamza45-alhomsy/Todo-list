import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Fixed import
import App from "./App.jsx";
import store from "./redux/store/store.js";
import { AuthProvider } from "./components/context/AuthProvider.jsx"; // Fixed import path

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
