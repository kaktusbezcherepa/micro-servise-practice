import { useEffect, useState } from 'react';
import '../src/Catalog.css'

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
        <div className="catalog-container">
            <h1 className="catalog-header">Список товаров</h1>
            {error ? (
                <div className="catalog-error">Ошибка: {error}</div>
            ) : (
                <ul className="catalog-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li className="catalog-item" key={product.id}>
                                {product.name} - {product.price} руб.
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
