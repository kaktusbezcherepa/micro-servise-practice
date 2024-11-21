const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect('mongodb://localhost:27017/userList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongodb для списка пользователей')
}).catch((err => {
    console.error('ошибка при подключении к списку пользоватьелей', err)
}))

app.use(cors());
app.use((express.json()));

app.get('/users', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users)
    console.log(users)
    } catch(err) {
        console.log("ошибка при получении списка юзеров", err)
    }
})

app.listen(PORT, () => {
    console.log(PORT)
})