import { Storefront, ShoppingCart, AdminPanelSettings, AccountBox } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
// import "../../../index.css"
import "./Header.css"

const Header = () => {
    return (
        <AppBar position="static" sx={{ background: 'black' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <a href="http://localhost:3010">LOGO</a> 
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>

                    <a href="http://localhost:3011/catalog">
                        <Storefront />
                    </a>
                    <a href="http://localhost:3012/cart">
                        <ShoppingCart />
                    </a>
                    <a href="http://localhost:3013/adminPanel">
                        <AdminPanelSettings />
                    </a>
                    <a href="http://localhost:3014/profile">
                        <AccountBox />
                    </a>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
