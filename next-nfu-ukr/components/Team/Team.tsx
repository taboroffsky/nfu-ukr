import React from "react";

const Team = () => {
 return (
    <div>
          <h1>Наша команда</h1>
        <p className="dreams">Наша мрія, як і мрія багатьох, — мир в Україні. Мир усьому світу! <br/> Щиро дякуємо всім за
        підтримку та допомогу Україні!</p>

        <div className="team-card">
      <img src="images/avatars/kostin.jpg" alt="Avatar"/>
      <div className="person-container">
        <h4>Андрій Костін</h4>
        <p>Засновник проекту</p>
      </div>
    </div>

    <div className="team-card">
      <img src="images/avatars/lukianiuk.jpg" alt="Avatar"/>
      <div className="person-container">
        <h4>Олександр Лук'янюк</h4>
        <p>2D художник</p>
      </div>
    </div>

    <div className="team-card">
      <img src="images/avatars/ishchuk.jpg" alt="Avatar"/>
      <div className="person-container">
        <h4>Тарас Іщук</h4>
        <p>Веб розробник</p>
      </div>
    </div>

    <div className="team-card">
      <img src="images/avatars/orsahosh.jpg" alt="Avatar"/>
      <div className="person-container">
        <h4>Влад Орсагош</h4>
        <p>Художник</p>
      </div>

      <div className="team-card">
      <img src="images/avatars/andrechenko.jpg" alt="Avatar"/>
      <div className="person-container">
        <h4>Марія Андреченко</h4>
        <p>Маркетолог</p>
      </div>
    </div>

    </div>
    </div>
 )
}

export default Team;