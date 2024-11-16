import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Box,
    Divider,
    List,
    ListItem,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(2),
    },
}));

const TotalPrice = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
}));

const FlexBox = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16px',
});

const FlexItem = styled(Box)(({ flex }) => ({
    flex: flex,
    minWidth: 0,
}));

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:3001/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            console.log('Cart data:', data);
            setCartItems(data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => {
            const price = item.productId?.price || 0;
            return sum + (price * item.quantity);
        }, 0);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Корзина
            </Typography>

            {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            ) : cartItems.length > 0 ? (
                <>
                    <List>
                        {cartItems.map((item) => (
                            <ListItem 
                                key={item._id} 
                                disablePadding 
                                sx={{ mb: 2 }}
                            >
                                <StyledCard sx={{ width: '100%' }}>
                                    <CardContent>
                                        <FlexBox>
                                            <FlexItem flex="1 1 100%">
                                                <Typography variant="h6" gutterBottom>
                                                    {item.productId?.name || 'Товар не найден'}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.productId?.description}
                                                </Typography>
                                            </FlexItem>
                                            <FlexItem flex="0 0 auto">
                                                <Typography variant="body1">
                                                    Цена: {item.productId?.price || 0} руб.
                                                </Typography>
                                            </FlexItem>
                                            <FlexItem flex="0 0 auto">
                                                <Typography variant="body1">
                                                    Количество: {item.quantity}
                                                </Typography>
                                            </FlexItem>
                                            <FlexItem flex="0 0 auto">
                                                <Typography variant="body1" fontWeight="bold">
                                                    Сумма: {(item.productId?.price || 0) * item.quantity} руб.
                                                </Typography>
                                            </FlexItem>
                                        </FlexBox>
                                    </CardContent>
                                </StyledCard>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <TotalPrice elevation={3}>
                        <Typography variant="h5" align="right">
                            Итого: {calculateTotal()} руб.
                        </Typography>
                    </TotalPrice>
                </>
            ) : (
                <Alert severity="info">
                    Корзина пуста
                </Alert>
            )}
        </Container>
    );
};

export default Cart;