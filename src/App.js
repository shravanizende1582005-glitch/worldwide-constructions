import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// ======================================
// PAGES
// ======================================

import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/Registration";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Feedback from "./pages/feedback";
import AdminPanel from "./pages/AdminPanel";

// ======================================
// PROTECTED ROUTE
// ======================================

import AdminProtectedRoute from "./components/AdminProtectedRoute";

// ======================================
// CSS
// ======================================

import "./App.css";

// ======================================
// HEADER
// ======================================

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ======================================
  // LOAD LOGGED-IN USER
  // ======================================

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error(
            "Invalid user data:",
            error
          );

          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Listen for login/logout changes
    window.addEventListener(
      "userChanged",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "userChanged",
        loadUser
      );
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    closeMenu();

    // Tell other components that user changed
    window.dispatchEvent(
      new Event("userChanged")
    );

    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* ======================================
            BRAND
        ====================================== */}

        <Link
          className="brand"
          to="/"
          aria-label="Worldwide Constructions home"
          onClick={closeMenu}
        >
          <span
            className="brand-mark"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>

          <span className="brand-name">
            WORLDWIDE
            <small>CONSTRUCTIONS</small>
          </span>
        </Link>

        {/* ======================================
            MOBILE MENU BUTTON
        ====================================== */}

        <button
          className={`menu-toggle${
            menuOpen ? " is-open" : ""
          }`}
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <span />
          <span />
        </button>

        {/* ======================================
            NAVIGATION
        ====================================== */}

        <nav
          className={`main-nav${
            menuOpen ? " is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <NavLink
            to="/feedback"
            onClick={closeMenu}
          >
            Feedback
          </NavLink>

          {/* ======================================
              LOGGED-OUT USER
          ====================================== */}

          {!user && (
            <Link
              className="nav-login"
              to="/login"
              onClick={closeMenu}
            >
              Log in
            </Link>
          )}

          {/* ======================================
              NORMAL USER
          ====================================== */}

          {user && user.isAdmin !== true && (
            <>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#263238",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                👤 {user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "1px solid #d5d8d6",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#263238",
                }}
              >
                Logout
              </button>
            </>
          )}

          {/* ======================================
              ADMIN USER
          ====================================== */}

          {user && user.isAdmin === true && (
            <>
              <Link
                to="/admin"
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#263238",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                👑 Admin Panel
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "1px solid #d5d8d6",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#263238",
                }}
              >
                Logout
              </button>
            </>
          )}

          {/* ======================================
              START PROJECT
          ====================================== */}

          <Link
            className="nav-cta"
            to="/contact"
            onClick={closeMenu}
          >
            Start a project{" "}
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ======================================
// FOOTER
// ======================================

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <Link
          className="brand footer-brand"
          to="/"
          aria-label="Worldwide Constructions home"
        >
          <span
            className="brand-mark"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>

          <span className="brand-name">
            WORLDWIDE
            <small>CONSTRUCTIONS</small>
          </span>
        </Link>

        <p>
          Thoughtfully built. Made to last.
        </p>

        <span className="footer-copy">
          © {new Date().getFullYear()} Worldwide Constructions
        </span>
      </div>
    </footer>
  );
}

// ======================================
// MOBILE INTRO
// ======================================

function MobileIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia?.(
        "(max-width: 640px)"
      ).matches
    ) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    setVisible(true);

    const timeout = window.setTimeout(() => {
      setVisible(false);

      document.body.style.overflow =
        previousOverflow;
    }, 3000);

    return () => {
      window.clearTimeout(timeout);

      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="mobile-intro"
      role="status"
      aria-live="polite"
    >
      <div
        className="mobile-intro-orbit mobile-intro-orbit-one"
        aria-hidden="true"
      />

      <div
        className="mobile-intro-orbit mobile-intro-orbit-two"
        aria-hidden="true"
      />

      <div
        className="mobile-intro-city"
        aria-hidden="true"
      >
        <span className="mobile-intro-building mobile-intro-building-distant-left" />

        <span className="mobile-intro-building mobile-intro-building-left" />

        <span className="mobile-intro-building mobile-intro-building-center" />

        <span className="mobile-intro-building mobile-intro-building-right" />

        <span className="mobile-intro-building mobile-intro-building-distant-right" />

        <span className="mobile-intro-ground" />
      </div>

      <div className="mobile-intro-content">
        <span
          className="mobile-intro-mark"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>

        <p className="mobile-intro-name">
          WORLDWIDE
          <small>CONSTRUCTIONS</small>
        </p>

        <span className="mobile-intro-kicker">
          CRAFTED FOR THE WAY YOU LIVE
        </span>

        <span
          className="mobile-intro-rule"
          aria-hidden="true"
        />

        <p className="mobile-intro-tagline">
          Thoughtfully built. Made to last.
        </p>
      </div>

      <span
        className="mobile-intro-caption"
        aria-hidden="true"
      >
        BUILT WITH CARE, FROM THE GROUND UP
      </span>
    </div>
  );
}

// ======================================
// MAIN APP
// ======================================

function App() {
  return (
    <BrowserRouter>

      <div className="app-shell">

        <MobileIntro />

        <SiteHeader />

        <main>
          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* SERVICES */}

            <Route
              path="/services"
              element={<Services />}
            />

            {/* CONTACT */}

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* FEEDBACK */}

            <Route
              path="/feedback"
              element={<Feedback />}
            />

            {/* LOGIN */}

            <Route
              path="/login"
              element={<Login />}
            />

            {/* REGISTRATION */}

            <Route
              path="/registration"
              element={<Registration />}
            />

            {/* ======================================
                PROTECTED ADMIN ROUTE
            ====================================== */}

            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminPanel />
                </AdminProtectedRoute>
              }
            />

            {/* FALLBACK */}

            <Route
              path="*"
              element={<Home />}
            />

          </Routes>
        </main>

        <SiteFooter />

      </div>

    </BrowserRouter>
  );
}

export default App;