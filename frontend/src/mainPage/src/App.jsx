import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import HomePage from './HomePage';
import Catalog from '../../catalog/src/Catalog';
import AdminDashboard from '../../admin/src/AdminDashboard';
import Cart from '../../cart/src/Cart'
import './index.css'

const App = () => {

    const navigationLinks = useMemo(() => (
        <>
            <NavLink to="/" exact activeClassName="active">Главная</NavLink>
            <NavLink to="/catalog" activeClassName="active">Каталог</NavLink>
            <NavLink to="/cart" activeClassName="active">Корзина</NavLink>
            <NavLink to="/adminPanel" activeClassName="active">Админ панель</NavLink>
        </>
    ), []);
    return (

    
        <Router>
            <nav>{navigationLinks}
                {/* <NavLink to="/">Главная</NavLink>
                <NavLink to="/catalog">Каталог</NavLink>
                <NavLink to="/cart">Корзина</NavLink> */}
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/adminPanel" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    
    );
};

export default App;
