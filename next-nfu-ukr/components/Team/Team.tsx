import React from "react";
import TeamStyle from "./Team.module.scss";
import teamMembers from "../../../nfu-ukr-common/resources/teamMembers.json";
import useTranslation from "next-translate/useTranslation";

const Team = () => {
  const {t} = useTranslation (`common`);
  return (
    <section className={`${TeamStyle.team} container`} id="team">
      <h1>{t("ourTeam")}</h1>
      <p>{t("ourTeamManifest")}</p>
      {
        teamMembers.map((teamMember) =>
        (
          <div className={TeamStyle.team_card}>
            <img src={teamMember.image} alt="Avatar" />
            <div>
              <h4>{teamMember.name}</h4>
              <p>{teamMember.role}</p>
            </div>
          </div>
        ))
      }
    </section>
  )
}

export default Team;