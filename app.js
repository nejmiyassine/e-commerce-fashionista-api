require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
const BASE_URL = require('./config/env').BASE_URL;
const DEV_URL = require('./config/env').DEV_URL;
const NODE_ENV = require('./config/env').NODE_ENV;

const indexRoutes = require('./routes/index.routes');

connectDb();

if (NODE_ENV === 'development') {
    app.use(
        cors({
            origin: DEV_URL,
            credentials: true,
        })
    );
}

if (NODE_ENV === 'production') {
    app.use(
        cors({
            origin: BASE_URL,
            credentials: true,
        })
    );
}

if (process.env.NODE_ENV === 'development') {
    res.cookie('token', token, {
        // can only be accessed by server requests
        httpOnly: true,
        // path = where the cookie is valid
        path: '/',
        // domain = what domain the cookie is valid on
        domain: 'localhost',
        // secure = only send cookie over https
        secure: false,
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: 'lax', // "strict" | "lax" | "none" (secure must be true)
        // maxAge = how long the cookie is valid for in milliseconds
        maxAge: 3600000 * 24, // 24 hour
    });
}

if (process.env.NODE_ENV === 'production') {
    res.cookie('token', token, {
        // can only be accessed by server requests
        httpOnly: true,
        // path = where the cookie is valid
        path: '/',
        // secure = only send cookie over https
        secure: true,
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: 'none', // "strict" | "lax" | "none" (secure must be true)
        // maxAge = how long the cookie is valid for in milliseconds
        maxAge: 3600000 * 24, // 24 hour
    });
}

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
