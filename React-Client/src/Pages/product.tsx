
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import "./product.css"
import { getData, createData } from '../common/serviceAPI';
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

const ProductForm: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [productId: number]: number }>({});
    const [elonMuskAssetValue, setElonMuskAssetValue] = useState(100000000);
    const [cart, setCart] = useState<CartItem[]>([]);
    useEffect(() => {
        fetchProduct();


    }, [])
    async function fetchProduct() {
        const getProduct = await getData("/api/v1/products");
        setProducts(getProduct);

    }

    


    // Hàm tăng giảm sản phẩm và cập nhập số tiền và Cart
    const increaseQuantity = (productId: number) => {
        const product = products.find((product) => product.id === productId);
        if (product) {
            setProductQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: (prevQuantities[productId] || 0) + 1,
            }));

            setElonMuskAssetValue((prevValue) => prevValue - product.price);

            const cartProductIndex = cart.findIndex((cartItem) => cartItem.product.id === productId);
            if (cartProductIndex !== -1) {
                cart[cartProductIndex].quantity += 1;
                setCart([...cart]);
            } else {
                setCart([...cart, { product, quantity: 1 }]);
            }
        }
    };

    const decreaseQuantity = (productId: number) => {
        if (productQuantities[productId] && productQuantities[productId] > 0) {
            setProductQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: prevQuantities[productId] - 1,
            }));

            const product = products.find((product) => product.id === productId);
            if (product) {
                setElonMuskAssetValue((prevValue) => prevValue + product.price);
            }
        }
        // Loại bỏ sản phẩm khỏi giỏ hàng hoặc giảm số lượng
        const cartProduct = cart.find((cartItem) => cartItem.product.id === productId);
        if (cartProduct) {
            if (cartProduct.quantity > 1) {
                cartProduct.quantity -= 1;
                setCart([...cart]);
            } else {
                const updatedCart = cart.filter((cartItem) => cartItem.product.id !== productId);
                setCart(updatedCart);
            }
        }
    };


    // Hàm tính tổng số tiền dựa trên danh sách sản phẩm và số lượng đã mua
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const product of products) {
            totalPrice += product.price * (productQuantities[product.id] || 0);
        }
        return totalPrice;
    };

    const calculateElonMuskPercentage = () => {
        const total = calculateTotalPrice();
        const elonMuskPercentage = ((total / elonMuskAssetValue) * 100).toFixed(2);
        return elonMuskPercentage;
    };

    const total = calculateTotalPrice();
    const elonMuskPercentage = calculateElonMuskPercentage();



    const handleCheckout = async () => {
        const cartItems = cart.map((cartItem) => ({
            name: cartItem.product.name,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
        }));
        try {
            const response = await createData('/api/v1/receipts', { cart: cartItems, total });
            const newReceipt = response.data;


            alert(`Đơn hàng đã được tạo thành công`);
        } catch (error) {
            console.error('Lỗi khi gửi đơn hàng:', error);
        }
    };



    return (
        <div className="body">
            <div className="summary">
                <span>Tổng số tiền đã mua: USD {total}</span>
                <span>Phần trăm tài sản của Elon Musk đã mua: {elonMuskPercentage}%</span>
                <span>Giá trị tài sản Elon Musk: USD {elonMuskAssetValue}</span>
            </div>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card className="product-card">
                            <CardMedia
                                component="img"
                                height="200"
                                width="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Price: USD {product.price}
                                </Typography>
                            </CardContent>
                            <div className="button-group">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => increaseQuantity(product.id)}
                                >
                                    Tăng
                                </Button>
                                <span>{productQuantities[product.id] || 0}</span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => decreaseQuantity(product.id)}
                                >
                                    Giảm
                                </Button>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="cart">
                <h2>Giỏ hàng</h2>
                <ul>
                    {cart.map((cartItem) => (
                        <li key={cartItem.product.id}>
                            <span>Tên sản phẩm: {cartItem.product.name}</span>
                            <span>Số lượng: {cartItem.quantity}</span>
                            <span>Giá: USD {cartItem.product.price}</span>
                        </li>
                    ))}
                </ul>
                <span>Tổng tiền giỏ hàng: USD {total}</span>
                <button onClick={handleCheckout}>Thanh toán</button>
            </div>
        </div>
    );
};

export default ProductForm;
