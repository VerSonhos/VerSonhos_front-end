import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/vlibras-fix.css";

import AppRoutes from "./routes/AppRoutes";
import VLibras from "@djpfs/react-vlibras";

createRoot(document.getElementById("root")).render(
  <>
    <VLibras forceOnload={true} />

    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </>
);
