import "modern-normalize";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalFormPage from "./ModalFormPage";
import ModalProvider from "./components/organisms/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalFormPage />
    <ModalProvider />
  </StrictMode>
);
