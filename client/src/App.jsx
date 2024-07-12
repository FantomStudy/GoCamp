import "./App.css";
import Header from "./components/header/Header";
import HelloPage from "./pages/helloPage/HelloPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import NewsPage from "./pages/newsPage/NewsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationPage from "./pages/applicationPage/ApplicationPage";
import { ToastContainer } from "react-toast";
import { useMediaQuery } from "react-responsive";

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/CampSite/" element={<HelloPage />} />
          <Route path="/CampSite/about" element={<AboutPage />} />
          <Route path="/CampSite/news" element={<NewsPage />} />
          <Route path="/CampSite/application" element={<ApplicationPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        delay={5000}
        position={isMobile ? "bottom-center" : "bottom-right"}
      />
    </>
  );
}
