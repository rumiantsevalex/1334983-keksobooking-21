'use strict';

// данные для генерации объявлений
const pricesData = {
  any: `любая`,
  middle: `10000 - 50000 ₽`,
  cheap: `до 10000 ₽`,
  high: `от 50000 ₽`
};

const typesData = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalo: `Бунгало`
};

const roomsData = {
  any: `Любое число комнат`,
  one: `Одна комната`,
  two: `Две комнаты`,
  three: `Три комнаты`
};

const guestsData = {
  any: `Любое число гостей`,
  one: `Один гость`,
  two: `Два гостя`,
  nobody: `Не для гостей`
};

const CHECKINDATA = [
  `12:00`,
  `13:00`,
  `14:00`
];

const CHECKOUTDATA = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURESDATA = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOSDATA = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const LOCATION = {
  X: {
    MIN: 100,
    MAX: 1100
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};

const PINSIZE = {
  WIDTH: 50,
  HEIGHT: 70
};


// генерируем случайное целое число
const randomInteger = function (min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

// аргумент shuffle для перемешивания sort()
const shuffle = function () {
  return Math.random() - 0.5;
};

// получаем случайное свойство из объекта
const randomProperty = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

// закрываем попап с помощью ESC
let onEscDown = function (evt) {
  if (evt.keyCode === 27) {
    document.querySelector(`.popup`).remove();
  }
};

// массив для объявлений
let announcements = [];

// генерируем объявление
let announcementsAmount = 8;
let createAnnouncements = function () {
  let randomLocationX = randomInteger(LOCATION.X.MIN, LOCATION.X.MAX) - PINSIZE.WIDTH / 2;
  let randomLocationY = randomInteger(LOCATION.Y.MIN, LOCATION.Y.MAX) - PINSIZE.HEIGHT;
  let avatarNumber = `0` + randomInteger(1, announcementsAmount);

  let announcement = {
    author: {
      avatar: `img/avatars/user` + avatarNumber + `.png`
    },
    offer: {
      title: `Квартира`,
      address: randomLocationX + `, ` + randomLocationY,
      price: randomProperty(pricesData),
      type: randomProperty(typesData),
      rooms: randomProperty(roomsData),
      guests: randomProperty(guestsData),
      checkin: CHECKINDATA[Math.floor(Math.random() * CHECKINDATA.length)],
      checkout: CHECKOUTDATA[Math.floor(Math.random() * CHECKOUTDATA.length)],
      features: FEATURESDATA.sort(shuffle).slice(0, randomInteger(0, FEATURESDATA.length)),
      description: `очень уютно`,
      photos: PHOTOSDATA.sort(shuffle).slice(0, randomInteger(0, PHOTOSDATA.length)),
    },
    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
  return announcement;
};

// Делаем несколько объявлений
for (let j = 0; j < announcementsAmount; j++) {
  announcements.push(createAnnouncements(j));
}

// делаем поля формы неактивными
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`fieldset`);

const deactivateForm = function () {
  for (let i = 0; i < adFormElements.length; i++) {
    let adFormElement = adFormElements[i];
    adFormElement.setAttribute(`disabled`, `disabled`);
  }
};
deactivateForm();

// делаем поля формы активными
const activateForm = function () {
  for (let i = 0; i < adFormElements.length; i++) {
    let adFormElement = adFormElements[i];
    adFormElement.removeAttribute(`disabled`, `disabled`);
  }
};

// генерируем метку
const mapPins = document.querySelector(`.map__pins`);
const mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPins = function (pinInfo) {
  let pinItem = mapPinsTemplate.cloneNode(true);
  pinItem.querySelector(`img`).src = pinInfo.author.avatar;
  pinItem.style.left = pinInfo.location.x + PINSIZE.WIDTH / 2 + `px`;
  pinItem.style.top = pinInfo.location.y + PINSIZE.HEIGHT + `px`;
  pinItem.querySelector(`img`).alt = pinInfo.offer.title;
  pinItem.addEventListener(`click`, function () {
    renderMapCard(pinInfo);
    document.addEventListener(`keydown`, onEscDown);
  });
  return pinItem;
};

// создаем фрагмент из всех меток и размещаем его на карте
const renderPins = function (pinsInfo) {
  let pinsFragment = document.createDocumentFragment();
  for (let j = 0; j < pinsInfo.length; j++) {
    pinsFragment.appendChild(createPins(pinsInfo[j]));
  }
  mapPins.appendChild(pinsFragment);
};

// Генерируем фотографии номеров
let createPhotosFragment = function (mapCardInfo) {
  let photosFragment = document.createDocumentFragment();
  let popupPhoto = document.querySelector(`template`).content.querySelector(`.popup__photo`);
  for (let t = 0; t < mapCardInfo.offer.photos.length; t++) {
    let popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = mapCardInfo.offer.photos[t];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};


// делаем карточку объявления
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilterContainer = document.querySelector(`.map__filters-container`);

const createMapCard = function (mapCardInfo) {
  let mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector(`.popup__title`).textContent = mapCardInfo.offer.title;
  mapCard.querySelector(`.popup__text--price`).textContent = mapCardInfo.offer.price + ` ₽/ночь`;
  mapCard.querySelector(`.popup__type`).textContent = mapCardInfo.offer.type;
  mapCard.querySelector(`.popup__text--capacity`).textContent = mapCardInfo.offer.rooms + ` комнаты для ` + mapCardInfo.offer.guests + ` гостей`;
  mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + mapCardInfo.offer.checkin + ` выезд до ` + mapCardInfo.offer.checkout;
  mapCard.querySelector(`.popup__features`).textContent = mapCardInfo.offer.features;
  mapCard.querySelector(`.popup__description`).textContent = mapCardInfo.offer.description;
  mapCard.querySelector(`.popup__photos`).removeChild(mapCard.querySelector(`.popup__photo`));
  mapCard.querySelector(`.popup__photos`).appendChild(createPhotosFragment(mapCardInfo));
  mapCard.querySelector(`.popup__avatar`).src = mapCardInfo.author.avatar;
  let closeAd = mapCard.querySelector(`.popup__close`);
  closeAd.addEventListener(`click`, function () {
    mapCard.remove();
    document.removeEventListener(`click`, onEscDown);
  });

  return mapCard;
};

// Вставляем карточку на карту
const renderMapCard = function (mapCardsInfo) {
  if (document.querySelector(`.popup`)) {
    document.querySelector(`.popup`).remove();
  }
  let mapCardsFragment = document.createDocumentFragment();
  mapCardsFragment.appendChild(createMapCard(mapCardsInfo));
  mapFilterContainer.before(mapCardsFragment);
};

// заполняем координаты в адресную строку
const adressInput = document.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
adressInput.value = (mainPin.offsetLeft + mainPin.offsetWidth / 2) + `, ` + (mainPin.offsetTop + mainPin.offsetHeight);

// "Активируем" карту
const map = document.querySelector(`.map`);

const getPageActive = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  activateForm();
  renderPins(announcements);
};

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    getPageActive();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === 13) {
    getPageActive();
  }
});

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
