import baseConfig from './app.base.config';

const config = {
  ...baseConfig,
  version: 'v1.0.0(test)',
  apiDomain: 'https://127.0.0.1:3000/',
  costCalculatorDebug: false
};

export default config;
