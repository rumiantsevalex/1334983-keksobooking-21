'use strict';

// Описываем функции, которые используются в проекте
(function () {
  window.util = {
    // получаем случайное целое число в диапазоне
    randomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // аргумент shuffle для перемешивания sort()
    shuffle: function () {
      return Math.random() - 0.5;
    },
    // получаем случайное свойство из объекта
    randomProperty: function (obj) {
      const keys = Object.keys(obj);
      return obj[keys[keys.length * Math.random() << 0]];
    },
    // для получения случайного значения
    compareRandom: function () {
      return Math.random() - 0.5;
    }
  };
})();
