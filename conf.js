exports.config = {      
    // Настройки, которые вам нужно определить
    specs: ['spec.js'],
    capabilities: {
      browserName: 'chrome'
    },
    // Местоположение драйвера selenium
    // seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
    // Местоположение chromedriver (для запуска в Chrome)
    chromeDriver: 'node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver',
    // Остальные настройки
    seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',

  };
  