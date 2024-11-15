import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../src/Catalog.css'

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:3001/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            if (!response.ok) {
                throw new Error('Ошибка при добавлении товара в корзину');
            }
            notify()
        } catch(err) {
            setError(err.message)
    }
}
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Загрузка товаров...</div>;
    }

    function notify() {
        toast.success('🦄 Товар успешно добавлен в корзину!', {
            position: "bottom-center",
            autoClose: 5000, // Уберите кавычки у числовых значений
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    return (
        <>
         <ToastContainer />
        <div className="catalog__container">
            <h1 className="catalog__header">Список товаров</h1>
            {error ? (
                <div className="catalog__error">Ошибка: {error}</div>
            ) : (
                <ul className="catalog__list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li className="catalog__item" key={product.id}>
                                {product.name} - {product.price} руб. <br />
                                {product.description} <br />
                                <button onClick={() =>
                                
                                addToCart(product)}>
                                    Добавить в корзину
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>Нет доступных товаров</li>
                    )}
                </ul>
            )}
        </div>
        </>
    )
};

export default Catalog;
