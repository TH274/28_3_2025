import { HomePage, ProductsPage, ProductDetailPage, CartPage, LoginPage, RegisterPage, CheckoutPage, OrdersPage, OrderDetailPage } from '../pages';

const publicRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/product/:id', element: <ProductDetailPage /> },
    { path: '/category/:category', element: <ProductsPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/new-arrivals', element: <ProductsPage /> },
    { path: '/wishlist', element: <ProductsPage /> },
  ];
  
  const privateRoutes = [
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/orders', element: <OrdersPage /> },
    { path: '/order/:id', element: <OrderDetailPage /> },
  ];

export {
    publicRoutes,
    privateRoutes
}