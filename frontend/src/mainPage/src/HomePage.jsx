import { Link } from 'react-router-dom';
import Header from '../../common_components/src/Header';
import './HomePage.css'



const HomePage = () => {
    return (
        <>
        <Header />
        <div className="container__home__page">
        <h1>Магазин</h1>
            <Link to="http://localhost:3011/catalog">
                <button>Перейти в каталог</button>
            </Link>
            <Link to="http://localhost:3012/cart">
                <button>Перейти в корзину</button>
            </Link>
        </div>    
        </>
    );
};

export default HomePage;
