import setupCorsDev from './cors.dev.js';
import setupCorsProd from './cors.prod.js';

const setupCors = (app) => {
  if (process.env.NODE_ENV === 'production') {
    setupCorsProd(app);
  } else {
    setupCorsDev(app);
  }
};

export default setupCors;
