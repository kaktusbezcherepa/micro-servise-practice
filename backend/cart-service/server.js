const express = require('express');
const mongoose = require('mongoose');
const CartItem = require('./models/CartItem');
const Product = require('./models/Product');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/items', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Подключено к MongoDB'))
.catch(err => console.error('Ошибка подключения к MongoDB:', err));

app.use(cors());
app.use(express.json());

app.get('/cart', async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('productId');
        // console.log('Элементы корзины:', cartItems);
        res.json(cartItems);
    } catch (err) {
        console.error('Ошибка при получении корзины:', err);
        res.status(500).json({ message: 'Ошибка при получении элементов корзины' });
    }
});

app.post('/cart', async (req, res) => {
    // console.log('Получен запрос:', req.body);
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Необходимы productId и quantity' });
        }
        const product = await Product.findById(productId);
        console.log('Найден продукт:', product);
        if (!product) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }
        const cartItem = new CartItem({
            productId,
            quantity
        });
        const savedItem = await cartItem.save();
        const populatedItem = await CartItem.findById(savedItem._id).populate('productId');     
        res.status(201).json(populatedItem);
    } catch (err) {
        console.error('Ошибка при добавлении в корзину:', err);
        res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервис корзины запущен на порту ${PORT}`);
});