import Logo from "../../assets/Logo.svg";
import style from "./Menu.module.sass";


export default function Menu({ scrollToSection, signupRef, usersRef }) {

  return (
    <div className={style.menu}>

      <div className={style.menu_content}>
        <img className={style.logo} src={Logo} alt="Logo" />
        
        <nav className={style.nav_list}>
          <button onClick={() => scrollToSection(usersRef)}>Users</button>
          <button onClick={() => scrollToSection(signupRef)}>Sign up</button>
        </nav>
      </div>

    </div>
  );
}