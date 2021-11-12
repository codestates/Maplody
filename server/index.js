const express = require('express');
const cors = require('cors');
const db = require('./db/connection');

const app = express();
app.use(express.json());
const port = 80;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  // 데이터베이스 연결 여부 조회
  db.query('use maplody', (err) => {
    if (err) {
      return res.status(200).send('database connection failed!');
    }
    // res.status(201).send('Hello World');
    return res.status(200).send('database connection succeed!');
  });
});
app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
