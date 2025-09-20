import "modern-normalize";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./components/pages";
import ModalProvider from "./components/organisms/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
    <ModalProvider />
  </StrictMode>
);
