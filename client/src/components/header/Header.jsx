import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <header>
        <h1 className="logoText">
          CAMP<span style={{ color: "var(--primary)" }}>/</span>
        </h1>
        <ul
          className={`headerNav ${isOpen ? "active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <Link to="/CampSite/">
            <li>Hello</li>
          </Link>

          <Link to="/CampSite/about">
            <li>About</li>
          </Link>

          <Link to="/CampSite/news">
            <li>News</li>
          </Link>

          <Link to="/CampSite/application" className="joinBurger">
            <li>Join us</li>
          </Link>
        </ul>

        <button
          className="headerButton"
          onClick={() => navigate("/CampSite/application")}
        >
          JOIN US
        </button>
        <button
          className={`burgerBtn ${isOpen ? "active" : ""}`}
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </>
  );
}
