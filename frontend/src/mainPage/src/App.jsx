import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Catalog from '../../catalog/src/Catalog';
import AdminDashboard from '../../admin/src/AdminDashboard';
import Cart from '../../cart/src/Cart'

const App = () => {
    return (
        <Router>
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
