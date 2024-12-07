const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv/config');

const port = 3001;

// 
app.use(cors());
app.use(express.json());
// 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});