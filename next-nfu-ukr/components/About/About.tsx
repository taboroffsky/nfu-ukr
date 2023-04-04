import useTranslation from "next-translate/useTranslation";
import React from "react";

import Style from "./About.module.scss"

const About = (): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <section className={`${Style.about} container`} id="about">
      <h1>{t("aboutProject")}</h1>
      <div className={Style.cards_container}>
        <div className={Style.card}>
          <h3>{t("revenueUsage")}</h3>

          <p><em><strong>{t("halfOfRevenue")}</strong></em></p>
          <p><em>{t("tenPercentTransfer")}</em></p>
        </div>

        <div className={Style.card}>
          <h3>{t("whatIsNFT")}</h3>
          <p><em>{t("abbreviationNFT")}</em></p>
          <p><em>{t("nonFungibility")}</em></p>
          <p><em>{t("digitalCertificates")}</em></p>
        </div>
        <div className={Style.card}>
          <h3>{t("whatIsNFU")}</h3>
          <p><em>{t("abbreviationNFU")}</em></p>
          <p><em>{t("descriptionNFU")}</em></p>
        </div>
      </div>
    </section>
  )
}

export default About