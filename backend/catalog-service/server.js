const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/items', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Подключено к MongoDB для продуктов');
}).catch((err) => {
    console.error('Ошибка подключения к MongoDB для продуктов:', err);
});

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Продукты:', products);
        res.json(products);
    } catch (err) {
        console.error('Ошибка при получении продуктов:', err);
        res.status(500).json({ message: 'Ошибка при получении продуктов', error: err });
    }
});

app.post('/products', async (req, res) => {
    const { name, price, description } = req.body;

    const product = new Product({
        name,
        price,
        description,
    });

    try {
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Ошибка при добавлении продукта:', err);
        res.status(500).json({ message: 'Ошибка при добавлении продукта', error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер продуктов работает на порту ${PORT}`);
});