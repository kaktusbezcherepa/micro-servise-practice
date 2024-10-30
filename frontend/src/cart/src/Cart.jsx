import { useState } from 'react'
import './Cart.css'
import { useEffect } from 'react';

const Cart = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:3001/cart')
                if(!response.ok){
                    throw new Error('Ошибка при загрузке данных')
                }
                const data = await response.json();
                setCartItems(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        };
        fetchCart()
    }, [])

    if(loading){
        return <div>Загрузка корзины...</div>
    }

  return (
    <>
        <h1>Корзина</h1>

        {error ? (
            <div>Ошибка: {error}</div>
        ) : cartItems.length > 0 ? (
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price} <br />
                        {item.description}
                    </li>
                ))}
            </ul>
        ) : (
            <div>Корзина пуста</div>
        )}
    </>
  )
}

export default Cart
