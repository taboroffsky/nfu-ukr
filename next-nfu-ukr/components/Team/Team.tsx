import React from "react";
import TeamStyle from "./Team.module.scss";

const teamMembers = [
  {
    name: "Андрій Костін",
    role: "Засновник проекту",
    image: "avatars/kostin.jpg"
  },
  {
    name: "Олександр Лук'янюк",
    role: "2D художник",
    image: "avatars/lukianiuk.jpg"
  },
  {
    name: "Тарас Іщук",
    role: "Веб розробник",
    image: "avatars/ishchuk.jpg"
  },
  {
    name: "Влад Орсагош",
    role: "Художник",
    image: "avatars/orsahosh.jpg"
  },
  {
    name: "Марія Андреченко",
    role: "Маркетолог",
    image: "avatars/andrechenko.jpg"
  }
];

const Team = () => {
  return (
    <section className={`${TeamStyle.team} container`} id="team">
      <h1>Наша команда</h1>
      <p>Наша мрія, як і мрія багатьох, — мир в Україні. Мир усьому світу! <br /> Щиро дякуємо всім за
        підтримку та допомогу Україні!</p>
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