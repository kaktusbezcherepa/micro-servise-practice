import { useState } from 'react';
import './AdminDashboard.css'
const AdminDashboard = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            alert('Товар добавлен!');
            setProduct({ name: '', price: '', description: '', imageURL: '' });
        } else {
            alert('Ошибка при добавлении товара');
        }
    };

    return (
        <>
        <div className="container">
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Название" value={product.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Цена" value={product.price} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Описание" value={product.description} onChange={handleChange} />
            <input type="text" name="imageURL" placeholder="URL изображения" value={product.imageURL} onChange={handleChange} />
            <button type="submit">Добавить товар</button>
        </form>
        </div>
        </>
    );
};

export default AdminDashboard;
