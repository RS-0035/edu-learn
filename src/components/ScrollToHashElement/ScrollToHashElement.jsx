// ScrollToHashElement.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        // Biroz kechiktirib, scroll qilish kerak (komponent yuklansin)
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return null;
};

export default ScrollToHashElement;
