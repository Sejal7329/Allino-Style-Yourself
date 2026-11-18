
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ShopContext = createContext(null);

const CART_KEY = "allino_cart";
const WISHLIST_KEY = "allino_wishlist";

const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return [];
  }
};

const makeCartKey = (id, size = "", color = "") =>
  `${id}::${size || ""}::${color || ""}`;

// Make older saved cart items compatible
const normalizeCart = (items) => {
  const normalized = [];

  items.forEach((item) => {
    const size = item.size || "";
    const color = item.color || "";
    const cartKey = makeCartKey(item.id, size, color);
    const quantity = Math.max(1, Number(item.quantity) || 1);

    const existingIndex = normalized.findIndex(
      (entry) => entry.cartKey === cartKey
    );

    if (existingIndex !== -1) {
      normalized[existingIndex].quantity += quantity;
    } else {
      normalized.push({
        ...item,
        size,
        color,
        cartKey,
        quantity,
      });
    }
  });

  return normalized;
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() =>
    normalizeCart(loadData(CART_KEY))
  );

  const [wishlist, setWishlist] = useState(() =>
    loadData(WISHLIST_KEY)
  );

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlist]);

  // Add product, including its selected options
  const addToCart = (product, options = {}) => {
    const size = options.size || "";
    const color = options.color || "";
    const quantity = Math.max(
      1,
      Math.floor(Number(options.quantity) || 1)
    );

    const cartKey = makeCartKey(product.id, size, color);

    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.cartKey === cartKey
      );

      if (existing) {
        return previousCart.map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          size,
          color,
          cartKey,
          quantity,
        },
      ];
    });
  };

  // Accept a cartKey or an older product ID
  const matchesCartItem = (item, identifier) =>
    item.cartKey === identifier ||
    item.id === identifier;

  const increaseQuantity = (identifier) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        matchesCartItem(item, identifier)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (identifier) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        matchesCartItem(item, identifier)
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeFromCart = (identifier) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => !matchesCartItem(item, identifier)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item.id === product.id
      );

      return exists
        ? previousWishlist.filter(
            (item) => item.id !== product.id
          )
        : [...previousWishlist, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((previousWishlist) =>
      previousWishlist.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartTotal,
        wishlistCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}
