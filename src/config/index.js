import devConfig from './app.dev.config';
import prodConfig from './app.prod.config';


const getConfiguration = (environment) => {
  if (environment === 'production') {
    return prodConfig;
  }
  return devConfig;
};

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const AppConfig = getConfiguration(process.env.NODE_ENV);
export default AppConfig;
