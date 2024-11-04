const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const userRouter = require('./controllers/userController');
const authRouter = require('./controllers/authController')

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use('/', express.json());

app.use('/auth', authRouter)
app.use('/factory', userRouter);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
