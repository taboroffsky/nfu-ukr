import React, { useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage'
import { ConnectButton } from 'web3uikit';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [isNavagitaionMenuActive, setIsNavagitaionMenuActive] = useState<boolean>(false);

  return (
    <div className={HeaderStyle.header} id="home">
      <div className={HeaderStyle.header_container}>
        <div className={HeaderStyle.logo}>
          <img src="logo/NFU_yellow.svg" alt="Logo Image" />
        </div>
        <div onClick={() => setIsNavagitaionMenuActive(!isNavagitaionMenuActive)} 
        className={isNavagitaionMenuActive ? [HeaderStyle.nav_links, HeaderStyle.active].join(' ') : HeaderStyle.nav_links }>
          <a href="#home">{t('main')}</a>
          <a href="#gallery">{t('gallery')}</a>
          <a href="#about">{t("aboutProject")}</a>
          <a href="#team">{t("ourTeam")}</a>
          <a href="#contacts">{t("contacts")}</a>
        </div>
          <ConnectButton moralisAuth={false} />
          <div onClick={() => setIsNavagitaionMenuActive(!isNavagitaionMenuActive)} className={HeaderStyle.mobile_menu_btn}>
            {isNavagitaionMenuActive ? <FontAwesomeIcon icon={faTimes} size="2x" color={"#FFD600"}/>
            : <FontAwesomeIcon icon={faBars} size="3x" color={"#FFD600"}/> }            
          </div>

        <div className={HeaderStyle.nav_language}>
          <img src="language/Flag_of_Ukraine.svg" alt="uk" data-google-lang="uk" className="language__img" onClick={() => setLanguage('ua')} />
          <img src="language/Flag_of_the_United_Kingdom.svg" alt="en" data-google-lang="en" className="language__img" onClick={() => setLanguage('en')} />
        </div>
      </div>
      <div className={HeaderStyle.emblem_container}>
        <div>
          <img className={HeaderStyle.emblem} src="/icons/flowers_corner.svg" alt="emblem icon left" />
        </div>
        <div className={HeaderStyle.logo_container}>
          <img className={HeaderStyle.logo_header_image} src="/logo/NFU-logo-300x300/NFU_yellow.svg" alt="logo header image" />
          <div className={HeaderStyle.description_item}>{t("motto")}</div>
        </div>
        <div className={HeaderStyle.emblem_wrapper}>
          <img className={HeaderStyle.emblem} src="/icons/flowers_corner.svg" alt="emblem icon right" />
        </div>
      </div>     
    </div>
  )
}

export default Header
