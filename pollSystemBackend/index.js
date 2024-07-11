const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const mysql = require('mysql2');
const connection = require('./db.js');
const app = express();
const authRoute = require('./routes/AuthRoute.js');
const adminRouter = require('./routes/AdminRoute.js');
const userRoute = require('./routes/userRoute.js');


dotenv.config();
app.use(cors());
//middlewares
app.use(express.json());

//middlewares
app.use('/api/v1/pollSystem/auth',authRoute);
app.use('/api/v1/pollSystem/admin',adminRouter);
app.use('/api/v1/pollSystem/user',userRoute)


app.listen(process.env.PORT, async () => {
    console.log('server has started successfully');
    await connection.connect((err) => {
        if (err) {
            console.log('There is some Error while Connecting database', err)
        }
        console.log('Database connected successfully', connection.threadId);
    })
})