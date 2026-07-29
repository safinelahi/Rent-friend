import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to top every single page 
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;