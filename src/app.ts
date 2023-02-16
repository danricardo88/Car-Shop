import express from 'express';
import routes from './router';
import HandleError from './middleware/handleError';

const app = express();
app.use(express.json());
app.use(routes);
app.use(HandleError.handle);

export default app;
