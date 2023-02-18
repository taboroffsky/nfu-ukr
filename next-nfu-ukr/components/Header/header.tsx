import React from "react";

import HeaderStyle from "./Header.module.scss";
import Image from 'next/image';
import flowers_corner from '../../public/icons/flowers_corner.svg'

const Header = (): JSX.Element => {
 return (
    <div className={HeaderStyle.header} id="home">
        <div className={HeaderStyle.nav_menu}id="header-nav">
            <a href="#home"><span>Головна сторінка</span></a>
            <a href="#gallery"><span>Галерея</span></a>
            <a href="#about"><span>Про проект</span></a>
            <a href="#team"><span>Наша команда</span></a>
            <a href="#contacts"><span>Контакти</span></a>
        </div>
    <div className="icons-header">
      <img className="emblem left" src="/icons/flowers_corner.svg" alt="emblem icon left"/>
      <img className="emblem right" src="/icons/flowers_corner.svg" alt="emblem icon right"/>
    </div>
    <div className="logo_header">
      <img className="logo_header_image" src="/logo/NFU-logo-300x300/NFU_yellow.svg" alt="logo header image"/>
    </div>
    <div className="description">
      <div className="description-item">Сучасне мистецтво крізь історію</div>
    </div>
    <div className="language">
      <img src="/language/Flag_of_Ukraine.svg" alt="uk" data-google-lang="uk" className="language__img"/>
      <img src="/language/Flag_of_the_United_Kingdom.svg" alt="en" data-google-lang="en" className="language__img"/>
    </div>
  </div>
 )
}

export default Header
