import { AppConfig } from 'ts/interfaces/global.interface';

const prodConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
};

const stagingConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
};

const localConfig: AppConfig = {
  apiBaseUrl: 'https://snft.ocg.technology/',
};

export default (function () {
  switch (process.env.REACT_APP_ENV) {
    case 'production':
      return prodConfig;

    case 'staging':
      return stagingConfig;

    case 'local':
    default:
      return localConfig;
  }
})();
