require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const { PORT, BASE_URL, DEV_URL, NODE_ENV } = require('./config/env');

const indexRoutes = require('./routes/index.routes');

connectDb();

const corsOptions = {
    origin: NODE_ENV === 'development' ? DEV_URL : BASE_URL,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// require('./middleware/passport');

app.get('/', async (req, res) => res.send('Hello World!'));

app.use('/v1', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
