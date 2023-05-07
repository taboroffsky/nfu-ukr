import React from "react";
import TeamStyle from "./Team.module.scss";
import teamMembers from "../../../nfu-ukr-common/resources/teamMembers.json";
import useTranslation from "next-translate/useTranslation";

const Team = () => {
  const { t: tCommon } = useTranslation("common");
  const { t: tTeamMembers } = useTranslation("teamMembers");

  return (
    <section className={`${TeamStyle.team} container`} id="team">
      <h1>{tCommon("ourTeam")}</h1>
      <p>{tCommon("ourTeamManifest")}</p>
      <div className={`${TeamStyle.team_members}`}>
        {
          teamMembers.map((teamMember) =>
          (
            <div className={TeamStyle.team_card} key={teamMember.name}>
              <img src={teamMember.image} alt="Avatar" />
              <div>
                <h4>{tTeamMembers(`${teamMember.name}`)}</h4>
                <p>{tTeamMembers(`${teamMember.role}`)}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Team;