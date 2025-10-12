'use client';

import { useState } from 'react';
import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

interface Product {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  rating: number;
}

export default function BestSellersPage() {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const products: Product[] = [
    { id: '1', name: "Luxury Shampoo", price: "$32", priceValue: 32, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800", rating: 5 },
    { id: '2', name: "Hydrating Conditioner", price: "$28", priceValue: 28, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800", rating: 5 },
    { id: '3', name: "Nail Polish Set", price: "$38", priceValue: 38, image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800", rating: 5 },
    { id: '4', name: "Facial Serum", price: "$65", priceValue: 65, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800", rating: 5 },
    { id: '5', name: "Makeup Brush Set", price: "$85", priceValue: 85, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800", rating: 5 },
    { id: '6', name: "Lace Front Wig", price: "$280", priceValue: 280, image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800", rating: 5 },
    { id: '7', name: "Clip-in Extensions", price: "$150", priceValue: 150, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800", rating: 5 },
    { id: '8', name: "Face Mask Set", price: "$48", priceValue: 48, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800", rating: 5 },
  ];

  const addToCart = (product: Product) => {
    setAddingToCart(product.id);
    
    // Get existing cart or create new one
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.priceValue,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Reset loading state after animation
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Best Sellers</h1>
            <p className="text-xl text-muted-foreground text-center">Our customers&apos; favorite products</p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                    <Badge className="absolute top-2 right-2">Best Seller</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">{product.price}</p>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(product)}
                        disabled={addingToCart === product.id}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {addingToCart === product.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
