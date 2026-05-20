import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider} from "./contexts/product.context";
import { InCartProvider } from "./contexts/cart.context";
import { PopUpProvider } from "./contexts/popup.context";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopUpProvider>
        <UserProvider>
          <CategoriesProvider>
            <InCartProvider>
              <App />
            </InCartProvider>
          </CategoriesProvider>
        </UserProvider>
      </PopUpProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
