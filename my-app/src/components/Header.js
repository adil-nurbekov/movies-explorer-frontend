import { useLocation } from "react-router-dom";
import "./Header.css";

import Nav from "./Nav";

function Header(props) {
  const location = useLocation();

  return (
    <header
      className={location.pathname === "/" ? "header header__color" : "header"}
    >
      <Nav isLogedIn={props.isLogedIn} burgerMenu={props.burgerMenu}></Nav>
    </header>
  );
}

export default Header;
