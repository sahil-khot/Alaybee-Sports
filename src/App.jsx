import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Categories from "./pages/Categories.jsx";
import Deals from "./pages/Deals.jsx";
import BestSellers from "./pages/BestSellers.jsx";
import Orders from "./pages/Orders.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { products } from "./data/products.js";

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("alaybee_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("alaybee_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("alaybee_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("alaybee_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("alaybee_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("alaybee_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location,
          message: "Please log in to add items to your cart.",
        },
      });
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const toggleWishlist = (product) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location,
          message: "Please log in to save items to your wishlist.",
        },
      });
      return;
    }

    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some((item) => item.id === product.id);
      return exists
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product];
    });
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={cartCount} wishlistCount={wishlist.length} ordersCount={orders.length} />

        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/product"
              element={
                <Product
                  products={products}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <Product
                  products={products}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/categories"
              element={<Categories products={products} onAddToCart={addToCart} />}
            />
            <Route
              path="/deals"
              element={
                <Deals
                  products={products}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/best-sellers"
              element={
                <BestSellers
                  products={products}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders orders={orders} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <Orders orders={orders} />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  subtotal={subtotal}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout
                    cart={cart}
                    subtotal={subtotal}
                    onPlaceOrder={addOrder}
                    onClearCart={clearCart}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              }
            />
            <Route path="/track-order" element={<TrackOrder />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
