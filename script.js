
// Gallery Card

var popupViews = document.querySelectorAll('.popup-view');
var popupBtns = document.querySelectorAll('.popup-btn');
var closeBtns = document.querySelectorAll('.close-btn');
//quick view button
var popup = function (popupClick) {
  popupViews[popupClick].classList.add('active');
}
popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click", () => {
    popup(i);
  });
});
//close button
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    popupViews.forEach((popupView) => {
      popupView.classList.remove('active');
    });
  });
});

// Translator

function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'cz' }, 'google_translate_element');
}

// Cookies

// Key under which name the cookie is saved
const cookieName = 'cookieconsent';
// The value could be used to store different levels of consent
const cookieValue = 'dismissed';

function dismiss() {
    const date = new Date();
    // Cookie is valid 1 year: now + (days x hours x minutes x seconds x milliseconds)
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    // Set cookie
    document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;

    // You probably want to remove the banner
    document.querySelector('.js-cookie-banner').remove();
}

// Get button element
const buttonElement = document.querySelector('.js-cookie-dismiss');
// Maybe cookie consent is not present
if (buttonElement) {
    // Listen on button click
    buttonElement.addEventListener('click', dismiss);
}