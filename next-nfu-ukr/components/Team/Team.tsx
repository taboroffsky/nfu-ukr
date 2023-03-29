import React from "react";
import TeamStyle from "./Team.module.scss";

const teamMembers = [
  {
    name: "Андрій Костін",
    role: "Засновник проекту",
    image: "images/avatars/kostin.jpg",
  },
  {
    name: "Олександр Лук'янюк",
    role: "2D художник",
    image: "images/avatars/lukianiuk.jpg",
  },
  {
    name: "Тарас Іщук",
    role: "Веб розробник",
    image: "images/avatars/ishchuk.jpg",
  },
  {
    name: "Влад Орсагош",
    role: "Художник",
    image: "images/avatars/orsahosh.jpg",
  },
  {
    name: "Марія Андреченко",
    role: "Маркетолог",
    image: "images/avatars/andrechenko.jpg",
  },
];

const Team = (teamMembers) => {
  return (
    <>
    <div className={`${TeamStyle.team} container`} id="team">
      <h1>Наша команда</h1>
      <p>
        Наша мрія, як і мрія багатьох, — мир в Україні. Мир усьому світу! <br />{" "}
        Щиро дякуємо всім за підтримку та допомогу Україні!
      </p>

      <div className={TeamStyle.team_card}>
        {teamMembers.map((teamMember) =>{
          return < teamMember = {teamMember}/>
        })}

      </div>
    </div>
    </>
  );
};

export default Team;
