import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.logo}>ITV</div>
      <div className={s.nav_menu}>
        <NavLink to="/hierarchy" className={s.nav_link}>
          Ієрархія
        </NavLink>
        <NavLink to="/alldata" className={s.nav_link}>
          Список
        </NavLink>
      </div>
      <div className={s.auth_block}>
        <p className={s.login}>{props.login}</p>
      </div>
    </header>
  );
};

export default Header;
