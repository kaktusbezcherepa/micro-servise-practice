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
        </div>    
        </>
    );
};

export default HomePage;
