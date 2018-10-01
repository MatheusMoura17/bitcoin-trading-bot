import * as express from 'express';

const app = express();

app.get('/', (req, res): void => {
  res.send('ok');
});

app.listen(3000, (): void => {
  console.log('app rodando em 3000');
});