import { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products'); 
                if (!response.ok) throw new Error('Ошибка загрузки товаров');
                const data = await response.json();
                setProducts(data); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);
    // { id: 1, name: 'Товар 1', price: 100, description: 'кружка', imageURL: '' },
    return (
        <>
           <h1 className='items__list__header'>Список товаров</h1>
           <div className='items__list__keys__container'>
            <ul className="items__list__keys">
                <li>id</li>
                <li>name</li>
                <li>price</li>
                <li>description</li>
                <li>imageURL</li>
            </ul>
           </div>
           <div className="items__list__items__container">
           {products.map((product) => (
                    
                    <ul className='product__list__item__info' key={product.id}>
                        <li>{product.id}</li>
                        <li>{product.name}</li>
                        <li>{product.price}</li>
                        <li>{product.description}</li>
                        <li>{product.imageURL}</li>
                    </ul>
                    
                ))}
           </div>
                
                
           
        
        </>
    );
};

export default AdminDashboard;
