import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Override document title to DEMAN AI LAB
document.title = "DEMAN AI LAB — Thiết kế bản vẽ AI cho doanh nghiệp";

// Keep overriding in case any plugin/script changes it
const titleObserver = new MutationObserver(() => {
  if (document.title !== "DEMAN AI LAB — Thiết kế bản vẽ AI cho doanh nghiệp") {
    document.title = "DEMAN AI LAB — Thiết kế bản vẽ AI cho doanh nghiệp";
  }
});
titleObserver.observe(document.querySelector('title')!, { childList: true, characterData: true, subtree: true });

createRoot(document.getElementById("root")!).render(<App />);
