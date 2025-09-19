 /* eslint-disable react-refresh/only-export-components */

// AppContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// ✅ Axios Configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // ✅ Fetch All Products (currently dummy)
  const fetchProducts = async () => {
    // TODO: Replace dummyProducts with actual API call
    setProducts(dummyProducts);
  };

  // ✅ Add product to cart
  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // ✅ Update product quantity in cart
  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // ✅ Remove product from cart
  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  // ✅ Get total item count in cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  // ✅ Get total amount of cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = products.find((product) => product._id === itemId);
      if (item) {
        totalAmount += item.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // ✅ Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
