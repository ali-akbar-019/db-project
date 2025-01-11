import express from 'express';
import cors from 'cors';
import myUserRoutes from './routes/myUserRoutes.js';
import productsRoute from './routes/productsRoute.js';
import favProductsRoute from './routes/myFavProductRoute.js';
import cartRoute from './routes/myCartRoute.js';
import orderRoute from './routes/orderRoute.js';

import 'dotenv/config';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads/files", express.static("uploads/files"));
// 

app.get('/health', (req, res) => {
  res.send({
    message: "Everything is Ok!"
  });
})
app.use("/api/user", myUserRoutes);
app.use("/api/products", productsRoute);
app.use('/api/fav', favProductsRoute);
app.use("/api/cart", cartRoute);
app.use('/api/order', orderRoute);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
