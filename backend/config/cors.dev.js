import cors from 'cors';

const setupCorsDev = (app) => {
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:5173'
      ],
      credentials: true
    })
  );
};

export default setupCorsDev;
