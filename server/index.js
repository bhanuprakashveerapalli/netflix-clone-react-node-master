require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

try {
    mongoose.connect(process.env.DB_URL,{
        authSource: "admin",
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connect to DB success!')
} catch (error) {
    console.log("Error DB connection: ", error)
}

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express()
app.use(cors(corsOptions))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: (process.env.SESSION_SECURE === 'true') ? true : false,
        httpOnly: true
    }
}))

app.use(morgan('dev'))
app.use(express.json())

app.get('/', function (request, response) {
    return response.status(200).send('It works !')
})

const userModel = require('./dataModels/user')

app.post('/register', async function (req, res) {
    
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const hash = bcrypt.hashSync(password, 10)

        console.log(hash);

        try {
            const User = new userModel({
                email: email,
                password: hash,
            })

            const user = await User.save()

            return res.status(200).json({
                message: "success_create",
                data: user
            })

        } catch (error) {

            return res.status(500)
                .json({
                    message: error.message,
                    code: 500
                })
        }

});

app.post('/login', async function (req, res) {
    
    const { email, password } = req.body

    console.log(bcrypt.hashSync(password, 10));

    if ((email && email !== "") && (password && password !== "")) {
        try {
            const user = await userModel.findOne({ 'email': email })

            console.log(user);
            if (!user) {

                return res.status(500).json({ message: 'User not found !' })
            }


            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(500).json({ message: "Email or Password don't match !" })
            }

            req.session.user = {
                "_id": user._id
            }

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            return res.status(200)
                .json({
                    message: "success_login",
                    'token': token,
                    user: user
                })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    } else {
        return res.status(500).json({ "msg": "Email and password are required !" })
    }

});

app.listen(process.env.PORT, () => {
    console.log('Server running on http://127.0.0.1:' + process.env.PORT)
})
