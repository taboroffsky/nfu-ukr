import React from "react";
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage'
import { ConnectButton } from 'web3uikit';

import HeaderStyle from "./Header.module.scss";

// This function's behavior needs to be applied
// const mobileMenu = () =>{
//   const hamburger: any = document.querySelector(".hamburger");
//   const navLinks: any = document.querySelector(".nav-links");
//   const links: any = document.querySelectorAll(".nav-links li");

//   hamburger.addEventListener('click', ()=>{
//      //Animate Links
//       navLinks.classList.toggle("open");
//       links.forEach(link => {
//           link.classList.toggle("fade");
//       });

//       //Hamburger Animation
//       hamburger.classList.toggle("toggle");
//   });
// }

const Header = (): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <div className={HeaderStyle.header} id="home">
      <nav>
        <div className={HeaderStyle.logo}>
          <img src="logo/NFU_yellow.svg" alt="Logo Image" />
        </div>
        <div className={HeaderStyle.hamburger}>
          <div className={HeaderStyle.line1}></div>
          <div className={HeaderStyle.line2}></div>
          <div className={HeaderStyle.line3}></div>
        </div>
        <ul className={HeaderStyle.nav_links}>
          <li><a href="#home">{t('main')}</a></li>
          <li><a href="#gallery">{t('gallery')}</a></li>
          <li><a href="#about">{t("aboutProject")}</a></li>
          <li><a href="#team">{t("ourTeam")}</a></li>
          <li><a href="#contacts">{t("contacts")}</a></li>
          <li><ConnectButton moralisAuth={false} /></li>
        </ul>

        <div className={HeaderStyle.nav_language}>
          <img src="language/Flag_of_Ukraine.svg" alt="uk" data-google-lang="uk" className="language__img" onClick={() => setLanguage('ua')} />
          <img src="language/Flag_of_the_United_Kingdom.svg" alt="en" data-google-lang="en" className="language__img" onClick={() => setLanguage('en')} />
        </div>
      </nav>
      <div>
        <img className={`${HeaderStyle.emblem} ${HeaderStyle.left}`} src="/icons/flowers_corner.svg" alt="emblem icon left" />
        <img className={`${HeaderStyle.emblem} ${HeaderStyle.right}`} src="/icons/flowers_corner.svg" alt="emblem icon right" />
      </div>
      <div className={HeaderStyle.header_container}>
        <img className={HeaderStyle.logo_header_image} src="/logo/NFU-logo-300x300/NFU_yellow.svg" alt="logo header image" />
        <div className={HeaderStyle.description_item}>{t("motto")}</div>
      </div>
    </div>
  )
}

export default Header
