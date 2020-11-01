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

// описываем перетаскивание главной метки
(function () {
  // указываем константы, в рамках которых сможет перемещаться метка
  const dragLimits = {
    X: {
      MIN: 0 - (window.PINSIZE.WIDTH / 2),
      MAX: 1200 - (window.PINSIZE.WIDTH / 2)
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  window.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newMainPinPosition = {
        x: window.mainPin.offsetLeft - shift.x,
        y: window.mainPin.offsetTop - shift.y
      };

      // Ограничим область установки пина
      if (newMainPinPosition.x > dragLimits.X.MAX) {
        newMainPinPosition.x = dragLimits.X.MAX;
      }
      if (newMainPinPosition.y > dragLimits.Y.MAX) {
        newMainPinPosition.y = dragLimits.Y.MAX;
      }
      if (newMainPinPosition.x < dragLimits.X.MIN) {
        newMainPinPosition.x = dragLimits.X.MIN;
      }
      if (newMainPinPosition.y < dragLimits.Y.MIN) {
        newMainPinPosition.y = dragLimits.Y.MIN;
      }

      // прописываем координаты в атрибуты пина, чтобы пин реально переместился
      window.mainPin.style.left = newMainPinPosition.x + `px`;
      window.mainPin.style.top = newMainPinPosition.y + `px`;

      // указываем новые координаты пина в поле "Адрес" формы
      window.adressInput.value = (window.mainPin.offsetLeft + window.mainPin.offsetWidth / 2) + `, ` + (window.mainPin.offsetTop + window.mainPin.offsetHeight);
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // удаляем обработчики
      document.removeEventListener(`mouseup`, onMouseUp);
      document.removeEventListener(`mousemove`, onMouseMove);
    };

    // добавляем обработчики на передвижение мыши и на отпускание кнопки мыши
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
