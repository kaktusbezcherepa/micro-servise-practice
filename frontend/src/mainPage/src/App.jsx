import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Storefront, ShoppingCart, AdminPanelSettings, AccountBox } from '@mui/icons-material';
import HomePage from './HomePage';
import Catalog from '../../catalog/src/Catalog';
import AdminDashboard from '../../admin/src/AdminDashboard';
import Cart from '../../cart/src/Cart'
import UserProfile from '../../user_profile/src/UserProfile';
import './index.css'

const App = () => {

    return (

    
        <Router>
            <AppBar position='static' sx={{ background: "black"}}>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        <NavLink to="/">LOGO</NavLink>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3}}>
                        <NavLink to="/catalog">{<Storefront />}</NavLink>
                        <NavLink to="/cart">{<ShoppingCart />}</NavLink>
                        <NavLink to="/adminPanel">{<AdminPanelSettings />}</NavLink>     
                        <NavLink to="/profile">{<AccountBox/>}</NavLink>  
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/adminPanel" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Router>
    
    );
};

export default App;
