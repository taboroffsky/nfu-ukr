import React from "react";

import HeaderStyle from "./Header.module.scss";
import Image from 'next/image';
import flowers_corner from '../../public/icons/flowers_corner.svg'

// This function's behavior needs to be applied
const mobileMenu = () =>{
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
  
  hamburger.addEventListener('click', ()=>{
     //Animate Links
      navLinks.classList.toggle("open");
      links.forEach(link => {
          link.classList.toggle("fade");
      });
  
      //Hamburger Animation
      hamburger.classList.toggle("toggle");
  });
}

const Header = (): JSX.Element => {
 return (
    <div className={HeaderStyle.header} id="home">
        <nav>
      <div className="logo">
        <img src="logo/NFU_yellow.svg" alt="Logo Image"/>
      </div>
      <div className="hamburger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Головна</a></li>
        <li><a href="#gallery">Галерея</a></li>
        <li><a href="#about">Про проект</a></li>
        <li><a href="#team">Наша команда</a></li>
        <li><a href="#contacts">Контакти</a></li>
      </ul>
    </nav>
    <div className="nav_language">
      <img src="language/Flag_of_Ukraine.svg" alt="uk" data-google-lang="uk" className="language__img"/>
      <img src="language/Flag_of_the_United_Kingdom.svg" alt="en" data-google-lang="en" className="language__img"/>
    </div>
    <div className="icons-header">
      <img className="emblem left" src="/icons/flowers_corner.svg" alt="emblem icon left"/>
      <img className="emblem right" src="/icons/flowers_corner.svg" alt="emblem icon right"/>
    </div>
    <div>
      <img className="logo_header_image" src="/logo/NFU-logo-300x300/NFU_yellow.svg" alt="logo header image"/>
    </div>
    <div className="description">
      <div className="description-item">Сучасне мистецтво крізь історію</div>
    </div>
  </div>
 )
}

export default Header
