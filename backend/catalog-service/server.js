const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let products = [
    { id: 1, name: 'Товар 1', price: 100, description: 'кружка', imageURL: '' },
    { id: 2, name: 'Товар 2', price: 200, description: 'катана', imageURL: '' },
    { id: 3, name: 'Товар 3', price: 300, description: 'наушники', imageURL: '' },
];

app.get('/status', (req, res) => {
    res.send('Сервер работает!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).json(product);
});

app.listen(PORT, () => {
    console.log(`${PORT}`);
});
