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

// массив для объявлений
let announcements = [];

// генерируем объявление
let createAnnouncements = function () {
  let randomLocationX = randomInteger(LOCATION.X.MIN, LOCATION.X.MAX) - PINSIZE.WIDTH / 2;
  let randomLocationY = randomInteger(LOCATION.Y.MIN, LOCATION.Y.MAX) - PINSIZE.HEIGHT;
  let avatarNumber = `0` + randomInteger(1, 8);

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
for (let j = 0; j < 8; j++) {
  announcements.push(createAnnouncements(j));
}

// "Активируем" карту для показа меток-объявлений
let map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = document.querySelector(`.map__pins`);
const mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// генерируем метку
const createPins = function (pinInfo) {
  let pinItem = mapPinsTemplate.cloneNode(true);
  pinItem.querySelector(`img`).src = pinInfo.author.avatar;
  pinItem.style.left = pinInfo.location.x + PINSIZE.WIDTH / 2 + `px`;
  pinItem.style.top = pinInfo.location.y + PINSIZE.HEIGHT + `px`;
  pinItem.querySelector(`img`).alt = pinInfo.offer.title;

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

renderPins(announcements);
