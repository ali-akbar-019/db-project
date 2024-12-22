import express from 'express';
import cors from 'cors';
import myUserRoutes from './routes/myUserRoutes.js';
import 'dotenv/config';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/user", myUserRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
