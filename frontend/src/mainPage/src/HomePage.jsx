import { Link } from 'react-router-dom';
import './HomePage.css'


const HomePage = () => {
    return (
        <>
        <div className="container">
        <h1>Магазин</h1>
            <Link to="/catalog">
                <button>Перейти в каталог</button>
            </Link>
            <Link to="cart">
                <button>Перейти в корзину</button>
            </Link>
        </div>    
        </>
    );
};

export default HomePage;
