const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let cart = []

app.get('/statusCart', (req, res) => {
    res.send('работает')
})

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.post('/cart', (req, res) => {
    const cartItem = req.body;
    cart.push(cartItem)
    res.status(201).json(cartItem)
})

app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1); 
        return res.status(200).json({ message: 'Товар удален' });
    } else {
        return res.status(404).json({ message: 'Товар не найден' }); 
    }
});

app.listen(PORT, () => {
    console.log(`${PORT}`)
})