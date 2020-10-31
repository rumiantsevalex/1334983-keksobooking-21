'use strict';

// Описываем взаимодейтсвие с картой
(function () {
  // создаем фрагмент из всех меток и размещаем его на карте
  const renderPins = function (pinsInfo) {
    let pinsFragment = document.createDocumentFragment();
    for (let j = 0; j < pinsInfo.length; j++) {
      pinsFragment.appendChild(window.createPins(pinsInfo[j]));
    }
    window.mapPins.appendChild(pinsFragment);
  };

  // Вставляем карточку на карту
  const renderMapCard = function (mapCardsInfo) {
    if (document.querySelector(`.popup`)) {
      document.querySelector(`.popup`).remove();
    }
    let mapCardsFragment = document.createDocumentFragment();
    mapCardsFragment.appendChild(window.createMapCard(mapCardsInfo));
    window.mapFilterContainer.before(mapCardsFragment);
  };
  window.renderMapCard = renderMapCard;

  // "Активируем" карту
  const map = document.querySelector(`.map`);

  const getPageActive = function () {
    map.classList.remove(`map--faded`);
    window.adForm.classList.remove(`ad-form--disabled`);
    window.activateForm();
    renderPins(window.announcements);
  };

  window.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      getPageActive();
    }
  }, {once: true});

  window.mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      getPageActive();
    }
  });
})();
