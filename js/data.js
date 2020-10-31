'use strict';

// Создаем данные для проекта
(function () {
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
  window.PINSIZE = PINSIZE;

  // получаеи набор особенностей номера
  let getFeatures = function () {
    FEATURESDATA.sort(window.util.compareRandom);
    return FEATURESDATA.slice(0, window.util.randomInteger(1, FEATURESDATA.length));
  };

  // массив для объявлений
  let announcements = [];
  window.announcements = announcements;

  // генерируем объявление
  let announcementsAmount = 8;
  let createAnnouncements = function () {
    let randomLocationX = window.util.randomInteger(LOCATION.X.MIN, LOCATION.X.MAX) - PINSIZE.WIDTH / 2;
    let randomLocationY = window.util.randomInteger(LOCATION.Y.MIN, LOCATION.Y.MAX) - PINSIZE.HEIGHT;
    let avatarNumber = `0` + window.util.randomInteger(1, announcementsAmount);

    let announcement = {
      author: {
        avatar: `img/avatars/user` + avatarNumber + `.png`
      },
      offer: {
        title: `Квартира`,
        address: randomLocationX + `, ` + randomLocationY,
        price: window.util.randomProperty(pricesData),
        type: window.util.randomProperty(typesData),
        rooms: window.util.randomProperty(roomsData),
        guests: window.util.randomProperty(guestsData),
        checkin: CHECKINDATA[Math.floor(Math.random() * CHECKINDATA.length)],
        checkout: CHECKOUTDATA[Math.floor(Math.random() * CHECKOUTDATA.length)],
        features: getFeatures(),
        description: `очень уютно`,
        photos: PHOTOSDATA.sort(window.util.shuffle).slice(0, window.util.randomInteger(0, PHOTOSDATA.length)),
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
  window.createPhotosFragment = createPhotosFragment;

  // Генерируем фичи номеров
  let createFeatureFragment = function (cardData) {
    let featureFragment = document.createDocumentFragment();
    for (let i = 0; i < cardData.offer.features.length; i++) {
      let featureItem = document.createElement(`li`);
      featureItem.className = `popup__feature popup__feature--` + cardData.offer.features[i];
      featureFragment.appendChild(featureItem);
    }
    return featureFragment;
  };
  window.createFeatureFragment = createFeatureFragment;
})();
