'use strict';

// описываем создание карточки объявления
(function () {

  // закрываем попап(карточку объявления) с помощью ESC
  let closePopupOnEsc = function (evt) {
    if (evt.keyCode === 27) {
      document.querySelector(`.popup`).remove();
    }
  };
  window.closePopupOnEsc = closePopupOnEsc;

  // делаем карточку объявления
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  window.mapFilterContainer = mapFilterContainer;

  const createMapCard = function (mapCardInfo) {
    let mapCard = mapCardTemplate.cloneNode(true);
    mapCard.querySelector(`.popup__title`).textContent = mapCardInfo.offer.title;
    mapCard.querySelector(`.popup__text--price`).textContent = mapCardInfo.offer.price + ` ₽/ночь`;
    mapCard.querySelector(`.popup__type`).textContent = mapCardInfo.offer.type;
    mapCard.querySelector(`.popup__text--capacity`).textContent = mapCardInfo.offer.rooms + ` комнаты для ` + mapCardInfo.offer.guests + ` гостей`;
    mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + mapCardInfo.offer.checkin + ` выезд до ` + mapCardInfo.offer.checkout;
    mapCard.querySelector(`.popup__features`).appendChild(window.createFeatureFragment(mapCardInfo));
    mapCard.querySelector(`.popup__description`).textContent = mapCardInfo.offer.description;
    mapCard.querySelector(`.popup__photos`).removeChild(mapCard.querySelector(`.popup__photo`));
    mapCard.querySelector(`.popup__photos`).appendChild(window.createPhotosFragment(mapCardInfo));
    mapCard.querySelector(`.popup__avatar`).src = mapCardInfo.author.avatar;
    let closeAd = mapCard.querySelector(`.popup__close`);
    closeAd.addEventListener(`click`, function () {
      mapCard.remove();
      document.removeEventListener(`click`, window.closePopupOnEsc);
    });

    return mapCard;
  };
  window.createMapCard = createMapCard;
})();
