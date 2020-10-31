'use strict';

// Описываем создание пинов(меток)
(function () {
  // генерируем метку
  const mapPins = document.querySelector(`.map__pins`);
  window.mapPins = mapPins;
  const mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPins = function (pinInfo) {
    let pinItem = mapPinsTemplate.cloneNode(true);
    pinItem.querySelector(`img`).src = pinInfo.author.avatar;
    pinItem.style.left = pinInfo.location.x + window.PINSIZE.WIDTH / 2 + `px`;
    pinItem.style.top = pinInfo.location.y + window.PINSIZE.HEIGHT + `px`;
    pinItem.querySelector(`img`).alt = pinInfo.offer.title;
    pinItem.addEventListener(`click`, function () {
      window.renderMapCard(pinInfo);
      document.addEventListener(`keydown`, window.closePopupOnEsc);
    });
    return pinItem;
  };
  window.createPins = createPins;
})();
