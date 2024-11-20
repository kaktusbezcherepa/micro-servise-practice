import { useEffect, useState } from 'react';
import { 
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
    Box
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Header from '../../common_components/src/Header';

const StyledCard = styled(Card)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
});

const ProductsContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
});

const ProductItem = styled(Box)({
    flexBasis: 'calc(33.333% - 2rem)',
    '@media (max-width: 960px)': {
        flexBasis: 'calc(50% - 2rem)',
    },
    '@media (max-width: 600px)': {
        flexBasis: '100%',
    },
});

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const addToCart = async (product) => {
        try {
            console.log('Отправляемый продукт:', product);

            const response = await fetch('http://localhost:3001/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                }),
            });

            const data = await response.json();
            console.log('Ответ сервера:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при добавлении в корзину');
            }

            toast.success('Товар добавлен в корзину!');
        } catch (err) {
            console.error('Ошибка:', err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                console.log('Полученные продукты:', data);
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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
        <Header />
            <ToastContainer />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{ mb: 4 }}
                >
                    Список товаров
                </Typography>

                {error ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Ошибка: {error}
                    </Alert>
                ) : (
                    <ProductsContainer>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductItem key={product._id}>
                                    <StyledCard>
                                        <StyledCardContent>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                {product.name}
                                            </Typography>
                                            <Typography 
                                                variant="h6" 
                                                color="primary" 
                                                gutterBottom
                                            >
                                                {product.price} руб.
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                            >
                                                {product.description}
                                            </Typography>
                                        </StyledCardContent>
                                        <CardActions>
                                            <Button 
                                                fullWidth 
                                                variant="contained" 
                                                onClick={() => addToCart(product)}
                                            >
                                                Добавить в корзину
                                            </Button>
                                        </CardActions>
                                    </StyledCard>
                                </ProductItem>
                            ))
                        ) : (
                            <Box width="100%">
                                <Alert severity="info">
                                    Нет доступных товаров
                                </Alert>
                            </Box>
                        )}
                    </ProductsContainer>
                )}
            </Container>
        </>
    );
};

export default Catalog;