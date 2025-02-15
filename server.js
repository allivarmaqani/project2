import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/random-number', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({ randomNumber });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
