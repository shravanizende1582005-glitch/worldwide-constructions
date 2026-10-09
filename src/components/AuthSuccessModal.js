import React, { useEffect, useRef } from "react";

function AuthSuccessModal({ message, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  return (
    <div className="auth-success-overlay">
      <section
        aria-labelledby="auth-success-title"
        aria-modal="true"
        className="auth-success-dialog"
        role="dialog"
      >
        <span aria-hidden="true" className="auth-success-icon">
          <span>✓</span>
        </span>
        <p className="auth-success-eyebrow">WORLDWIDE CONSTRUCTIONS</p>
        <h2 id="auth-success-title">You’re all set.</h2>
        <p className="auth-success-message">{message}</p>
        <button
          className="auth-success-button"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          Continue
          <span aria-hidden="true">↗</span>
        </button>
      </section>
    </div>
  );
}

export default AuthSuccessModal;
