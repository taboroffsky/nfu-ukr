import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import useTranslation from "next-translate/useTranslation";

import FooterStyle from "./Foooter.module.scss"

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <section className={`${FooterStyle.contacts} container`} id="contacts">
        <h1>{t("contacts")}</h1>
        <FontAwesomeIcon icon={faEnvelope} size="6x" />
        <p><em><b>{t("contactUs")}</b></em></p>
        <address>
          <a href="mailto:someone@example.com"><em>someone@example.com</em></a>
        </address>
      </section>
      <section className={`${FooterStyle.footer} container`}>
        <hr />
        <div className={FooterStyle.nav_menu} id="footer-nav">
          <a href="#home"><span>{t("main")}</span></a>
          <a href="#gallery"><span>{t("gallery")}</span></a>
          <a href="#about"><span>{t("aboutProject")}</span></a>
          <a href="#team"><span>{t("ourTeam")}</span></a>
          <a href="#contacts"><span>{t("contacts")}</span></a>
        </div>
        <hr />
        <div className={FooterStyle.footer_media}>
          <a href="https://www.instagram.com/" title="Instagram" target="_blank"><img src="icons/instagram_logo.png"
            className={FooterStyle.icon_img} alt="instagram-logo" /></a>
          <a href="https://www.facebook.com/" title="Facebook" target="_blank"><img src="icons/facebook_logo.png"
            className={FooterStyle.icon_img} alt="facebook-logo" /></a>
          <a href="https://www.linkedin.com/" title="LinkedIn" target="_blank"><img src="icons/linkedin_logo.png"
            className={FooterStyle.icon_img} alt="linkedin-logo" /></a>
          <a href="https://twitter.com/" title="Twitter" target="_blank"><img src="icons/twitter_logo.png"
            className={FooterStyle.icon_img} alt="twitter-logo" /></a>
        </div>

        <div className={FooterStyle.copyright}>
          <p>Copyright &copy; 2023 NFU Non-Fungible Ukraine. {t("allRightsReserved")}</p>
        </div>
      </section>
    </>
  )
}

export default Footer;