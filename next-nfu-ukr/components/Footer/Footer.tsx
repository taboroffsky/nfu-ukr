import React from "react";

import FooterStyle from "./Foooter.module.scss"

const Footer = () => {
    return (
      <>
          <section className={`${FooterStyle.contacts} container`} id="contacts">
            <h1>Контакти</h1>
            <i className="fa-solid fa-envelope fa-6x"/>
            <p><em><b>Зв'яжіться з нами:</b></em></p>
            <address>
              <a href="mailto:someone@example.com"><em>someone@example.com</em></a>
            </address>
          </section>
          <section className={`${FooterStyle.footer} container`}>
              <hr/>
              <div className={FooterStyle.nav_menu} id="footer-nav">
                <a href="#home"><span>Домашня</span></a>
                <a href="#gallery"><span>Галерея</span></a>
                <a href="#about"><span>Про проект</span></a>
                <a href="#team"><span>Наша команда</span></a>
                <a href="#contacts"><span>Контакти</span></a>
              </div>
              <hr/>
              <div className={FooterStyle.footer_media}>
                <a href="https://www.instagram.com/" title="Instagram" target="_blank"><img src="icons/instagram_logo.png"
                    className={FooterStyle.icon_img} alt="instagram-logo"/></a>
                <a href="https://www.facebook.com/" title="Facebook" target="_blank"><img src="icons/facebook_logo.png"
                    className={FooterStyle.icon_img} alt="facebook-logo"/></a>
                <a href="https://www.linkedin.com/" title="LinkedIn" target="_blank"><img src="icons/linkedin_logo.png"
                    className={FooterStyle.icon_img} alt="linkedin-logo"/></a>
                <a href="https://twitter.com/" title="Twitter" target="_blank"><img src="icons/twitter_logo.png"
                    className={FooterStyle.icon_img} alt="twitter-logo"/></a>
              </div>

              <div className={FooterStyle.copyright}>
                <p>Copyright &copy; 2023 NFU Non-Fungible Ukraine. All Rights Reserved.</p>
              </div>
            </section>
      </>
    )
}

export default Footer;