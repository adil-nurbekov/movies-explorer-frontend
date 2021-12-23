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
          <a
            className="footer__links"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__links"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Gitgub
          </a>
          <a
            className="footer__links"
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
