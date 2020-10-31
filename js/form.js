'use strict';

// описываем правила обработки формы
(function () {
  // делаем поля формы неактивными
  const adForm = document.querySelector(`.ad-form`);
  window.adForm = adForm;
  const adFormElements = adForm.querySelectorAll(`fieldset`);

  const deactivateForm = function () {
    for (let i = 0; i < adFormElements.length; i++) {
      let adFormElement = adFormElements[i];
      adFormElement.setAttribute(`disabled`, `disabled`);
    }
  };
  deactivateForm();
  window.deactivateForm = deactivateForm;

  // делаем поля формы активными
  const activateForm = function () {
    for (let i = 0; i < adFormElements.length; i++) {
      let adFormElement = adFormElements[i];
      adFormElement.removeAttribute(`disabled`, `disabled`);
    }
  };

  window.activateForm = activateForm;

  // заполняем координаты в адресную строку
  const adressInput = document.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);
  window.mainPin = mainPin;
  adressInput.value = (mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + (mainPin.offsetTop + mainPin.offsetHeight);

  // Синхронизируем количество комнат с количеством гостей
  const roomNumber = document.querySelector(`#room_number`);
  const roomCapasity = document.querySelector(`#capacity`);
  const roomCapasityOptions = roomCapasity.querySelectorAll(`option`);

  let roomsCapacitySync = function () {
    switch (roomNumber.value) {
      case `1`:
        roomCapasityOptions[0].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[1].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[2].setAttribute(`selected`, true);
        roomCapasityOptions[3].setAttribute(`disabled`, `disabled`);
        break;
      case `2`:
        roomCapasityOptions[0].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[3].setAttribute(`disabled`, `disabled`);
        break;
      case `3`:
        roomCapasityOptions[3].setAttribute(`disabled`, `disabled`);
        break;
      case `100`:
        roomCapasityOptions[0].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[1].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[2].setAttribute(`disabled`, `disabled`);
        roomCapasityOptions[3].setAttribute(`selected`, true);
        break;
    }
  };

  roomNumber.addEventListener(`change`, roomsCapacitySync);

  // Указываем минимальную стоимость для каждого типа жилья
  const housingType = document.querySelector(`#type`);
  const housingPrice = document.querySelector(`#price`);

  let housingMinCost = function () {
    switch (housingType.value) {
      case `bungalow`:
        housingPrice.setAttribute(`min`, 0);
        break;
      case `flat`:
        housingPrice.setAttribute(`min`, 1000);
        break;
      case `house`:
        housingPrice.setAttribute(`min`, 5000);
        break;
      case `palace`:
        housingPrice.setAttribute(`min`, 10000);
        break;
    }
  };

  housingType.addEventListener(`change`, housingMinCost);

  // Синхронизируем поля заезда-выезда
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);

  let timeInSync = function () {
    switch (timeIn.value) {
      case `12:00`:
        timeOut.value = `12:00`;
        break;
      case `13:00`:
        timeOut.value = `13:00`;
        break;
      case `14:00`:
        timeOut.value = `14:00`;
        break;
    }
  };

  let timeOutSync = function () {
    switch (timeOut.value) {
      case `12:00`:
        timeIn.value = `12:00`;
        break;
      case `13:00`:
        timeIn.value = `13:00`;
        break;
      case `14:00`:
        timeIn.value = `14:00`;
        break;
    }
  };

  timeIn.addEventListener(`change`, timeInSync);
  timeOut.addEventListener(`change`, timeOutSync);
})();
