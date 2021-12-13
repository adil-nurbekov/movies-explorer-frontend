import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        {" "}
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright-wrapper">
        <p className="footer__date">
          &copy; {new Date().getFullYear()} Adil Nurbekov
        </p>
        <div className="footer__links-wrapper">
          <p className="footer__links">Яндекс.Практикум</p>
          <p className="footer__links">Gitgub</p>
          <p className="footer__links">Facebook</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
