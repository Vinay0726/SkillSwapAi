import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const ClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!ClerkKey) throw new Error("Clerk Key Required");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={ClerkKey}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
