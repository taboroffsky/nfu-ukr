import React from "react";

const Gallery = (): JSX.Element => {
    return (
        <>
            <h1>Галерея</h1>
    <div className="products">
      <div className="product">
        <div className="product-card">
          <h2 className="name">ОРК</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="./images/wireframes/Russian_occupier.jpg" className="product-img" alt="Russian occupier image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="./images/wireframes/Russian_occupier.jpg" alt="Russian occupier image"/>
            </div>
            <div className="info">
              <h2>ОРК</h2><span>колекція орки</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>У літературі орками називали армію міфічних істот, які були відлюдниками з низьким інтелектом. У
                розумінні англійського письменника Джона Толкіна, орки – це темні створіння, які втілюють зло. Вони
                підкорялися Темному Володарю і становили основу його збройних сил. Їх військо підкорювало не силою, а
                кількістю. Орки мали вкрай низький інтелект і не звикли жити в комфорті..</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">Зображення</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="#" className="product-img" alt="Some image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="#" alt="Some image"/>
            </div>
            <div className="info">
              <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                assumenda voluptas at iusto?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">Зображення</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="#" className="product-img" alt="Some image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="#" alt="Some image"/>
            </div>
            <div className="info">
              <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                assumenda voluptas at iusto?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">Зображення</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="#" className="product-img" alt="Some image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="#" alt="Some image"/>
            </div>
            <div className="info">
              <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                assumenda voluptas at iusto?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">Зображення</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="#" className="product-img" alt="Some image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="#" alt="Some image"/>
            </div>
            <div className="info">
              <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                assumenda voluptas at iusto?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="product-card">
          <h2 className="name">Зображення</h2>
          <span className="price">$140.00</span>
          <a className="popup-btn">Подробиці</a>
          <img src="#" className="product-img" alt="Some image"/>
        </div>
        <div className="popup-view">
          <div className="popup-card">
            <a><i className="fas fa-times close-btn"></i></a>
            <div className="product-img">
              <img src="#" alt="Some image"/>
            </div>
            <div className="info">
              <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
              <span className="price">$ 140.00</span>
              <a href="#" className="add-cart-btn">Купити</a>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                assumenda voluptas at iusto?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default Gallery;