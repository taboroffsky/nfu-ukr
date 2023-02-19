import React from "react";

import GalleryStyle from "./Gallery.module.scss";

const Gallery = (): JSX.Element => {
    return (
      <section className={`${GalleryStyle.gallery} container`} id="gallery">
        <h1>Галерея</h1>
        <div className={GalleryStyle.products}>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>ОРК</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="/wireframes/Russian_occupier.jpg" className={GalleryStyle.product_img} alt="Russian occupier image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="/wireframes/Russian_occupier.jpg" alt="Russian occupier image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>ОРК</h2><span>колекція орки</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>У літературі орками називали армію міфічних істот, які були відлюдниками з низьким інтелектом. У
                    розумінні англійського письменника Джона Толкіна, орки – це темні створіння, які втілюють зло. Вони
                    підкорялися Темному Володарю і становили основу його збройних сил. Їх військо підкорювало не силою, а
                    кількістю. Орки мали вкрай низький інтелект і не звикли жити в комфорті..</p>
                </div>
              </div>
            </div>
          </div>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>Зображення</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="#" className={GalleryStyle.product_img} alt="Some image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="#" alt="Some image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                    voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                    assumenda voluptas at iusto?</p>
                </div>
              </div>
            </div>
          </div>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>Зображення</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="#" className={GalleryStyle.product_img} alt="Some image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="#" alt="Some image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                    voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                    assumenda voluptas at iusto?</p>
                </div>
              </div>
            </div>
          </div>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>Зображення</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="#" className={GalleryStyle.product_img} alt="Some image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="#" alt="Some image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                    voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                    assumenda voluptas at iusto?</p>
                </div>
              </div>
            </div>
          </div>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>Зображення</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="#" className={GalleryStyle.product_img} alt="Some image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="#" alt="Some image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                    voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                    assumenda voluptas at iusto?</p>
                </div>
              </div>
            </div>
          </div>
          <div className={GalleryStyle.product}>
            <div className={GalleryStyle.product_card}>
              <h2 className={GalleryStyle.name}>Зображення</h2>
              <span className={GalleryStyle.price}>$140.00</span>
              <a className={GalleryStyle.popup_btn}>Подробиці</a>
              <img src="#" className={GalleryStyle.product_img} alt="Some image"/>
            </div>
            <div className={GalleryStyle.popup_view}>
              <div className={GalleryStyle.popup_card}>
                <a><i className="fas fa-times close-btn"></i></a>
                <div className={GalleryStyle.product_img}>
                  <img src="#" alt="Some image"/>
                </div>
                <div className={GalleryStyle.info}>
                  <h2>Назва Зображення</h2><span>Назва Кщлекції</span>
                  <span className={GalleryStyle.price}>$ 140.00</span>
                  <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas minus eveniet quae, vitae iure
                    voluptates! Provident qui dolor, animi repudiandae nostrum, molestiae molestias quaerat minus incidunt,
                    assumenda voluptas at iusto?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    )
}

export default Gallery;