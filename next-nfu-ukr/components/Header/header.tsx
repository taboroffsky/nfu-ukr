import React from 'react';

import HeaderStyle from "./Header.module.scss";

const Header = (): JSX.Element => {
 return (
    <div className="header" id="home">
        <div className="nav_menu" id="header-nav">
            <a href="#home"><span>Головна сторінка</span></a>
            <a href="#gallery"><span>Галерея</span></a>
            <a href="#about"><span>Про проект</span></a>
            <a href="#team"><span>Наша команда</span></a>
            <a href="#contacts"><span>Контакти</span></a>
        </div>
    <div className="icons_header">
      <img className="emblem left" src="./images/icons/flowers_corner.svg" alt="emblem icon left"/>
      <img className="emblem right" src="./images/icons/flowers_corner.svg" alt="emblem icon right"/>
    </div>
    <div className="logo_header">
      <img className="logo_header_image" src="./images/logo/NFU logo 300x300/NFU_yellow.svg" alt="logo header image"/>
    </div>
    <div className="description">
      <div className="description-item">Сучасне мистецтво крізь історію</div>
    </div>
    <div className="language">
      <img src="images/language/Flag_of_Ukraine.svg" alt="uk" data-google-lang="uk" className="language__img"/>
      <img src="images/language/Flag_of_the_United_Kingdom.svg" alt="en" data-google-lang="en" className="language__img"/>
    </div>
  </div>
 )
}

export default Header
