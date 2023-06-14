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
          <a href="mailto:andruberkost@gmail.com"><em>andruberkost@gmail.com</em></a>
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
          <a href="https://www.instagram.com/_nfukraine_/" title="Instagram" target="_blank"><img src="icons/instagram.png"
            className={FooterStyle.icon_img} alt="instagram-logo" /></a>
          <a href="https://www.facebook.com/" title="Facebook" target="_blank"><img src="icons/facebook.png"
            className={FooterStyle.icon_img} alt="facebook-logo" /></a>
          <a href="https://www.youtube.com/channel/UCAmIbP5BUGPNomN29wEQuIg" title="YouTube" target="_blank"><img src="icons/youtube.png"
            className={FooterStyle.icon_img} alt="youtube-logo" /></a>
          <a href="https://twitter.com/NFU_Ukraine?t=d-iE8SC7gRKDVHK4DfzGWA&s=09" title="Twitter" target="_blank"><img src="icons/twitter.png"
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