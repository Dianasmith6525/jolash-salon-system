'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, User, ShoppingCart, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Function to update cart count
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const cartData = JSON.parse(cart);
        setCartItems(cartData.length || 0);
      } else {
        setCartItems(0);
      }
    };

    // Initial cart count
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-sm opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-2xl font-bold tracking-wider">JOLASH</span>
              </div>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SALON
            </span>
          </Link>

          {/* Navigation - Improved spacing */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
            >
              HOME
            </Link>
            <Link 
              href="/features" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
            >
              SERVICES
            </Link>
            <Link 
              href="/shop-by-concern" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md whitespace-nowrap"
            >
              SHOP BY CONCERN
            </Link>
            <Link 
              href="/best-sellers" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md whitespace-nowrap"
            >
              BEST SELLERS
            </Link>
            <Link 
              href="/wigs" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
            >
              WIGS
            </Link>
            <Link 
              href="/extensions" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md whitespace-nowrap"
            >
              EXTENSIONS & CARE
            </Link>
            <Link 
              href="/promotions" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
            >
              PROMOTIONS
            </Link>
            <Link 
              href="/jolash-vip" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md whitespace-nowrap"
            >
              JOLASH VIP
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium tracking-wide hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
            >
              ABOUT
            </Link>
          </nav>

          {/* Right side icons - 3D design */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - 3D effect */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative group p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative">
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-white drop-shadow-lg" />
                ) : (
                  <Moon className="h-5 w-5 text-white drop-shadow-lg" />
                )}
              </div>
            </button>

            {/* User Icon - 3D effect - Now functional login */}
            {user ? (
              <div className="relative group">
                <button 
                  className="relative group p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  aria-label={`Logged in as ${user.name}`}
                  title={`Logged in as ${user.name}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative">
                    <User className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                </button>
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="absolute -right-2 -top-2 p-1 bg-red-500 hover:bg-red-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-3 w-3 text-white" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button 
                  className="relative group p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  aria-label="User account / Login"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative">
                    <User className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                </button>
              </Link>
            )}

            {/* Cart Icon - 3D effect - Now functional cart */}
            <Link href="/cart">
              <button 
                className="relative group p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                aria-label="Shopping cart"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-white drop-shadow-lg" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItems}
                    </span>
                  )}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
