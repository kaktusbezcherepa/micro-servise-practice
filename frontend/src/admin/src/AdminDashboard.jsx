import  { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) throw new Error('Ошибка загрузки товаров');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const tableHeaders = ['ID', 'Название', 'Цена', 'Описание', 'URL изображения'];

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Ошибка: {error}</Alert>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Список товаров
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.imageURL}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminDashboard;