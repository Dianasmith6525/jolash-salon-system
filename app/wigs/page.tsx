'use client';

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WigsPage() {
  const wigs = [
    { id: "lace-front-natural-black", name: "Lace Front Wig - Natural Black", price: "$280", priceValue: 280, description: "100% human hair, natural hairline", image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800" },
    { id: "full-lace-brown", name: "Full Lace Wig - Brown", price: "$320", priceValue: 320, description: "Premium quality, versatile styling", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800" },
    { id: "synthetic-blonde", name: "Synthetic Wig - Blonde", price: "$120", priceValue: 120, description: "Affordable, heat-resistant fiber", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800" },
    { id: "bob-auburn", name: "Bob Wig - Auburn", price: "$250", priceValue: 250, description: "Trendy bob cut, natural look", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800" },
    { id: "long-curly", name: "Long Curly Wig", price: "$300", priceValue: 300, description: "Gorgeous curls, full volume", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800" },
    { id: "pixie-cut", name: "Pixie Cut Wig", price: "$180", priceValue: 180, description: "Short and chic style", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800" },
  ]

  // Add to Cart handler
  const handleAddToCart = (wig: { name: string; price: string; priceValue: number; description: string; image: string }) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({
        id: `wig-${Date.now()}`,
        name: wig.name,
        price: wig.priceValue,
        description: wig.description,
        image: wig.image,
        quantity: 1,
        type: 'wig',
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      alert(`${wig.name} added to cart!`);
    } catch (e) {
      alert('Error adding to cart.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Premium Wigs</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Transform your look with our collection of high-quality wigs
            </p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wigs.map((wig) => (
                <Card key={wig.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/wigs/${wig.id}`}>
                    <div className="h-72 bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url(${wig.image})` }} />
                  </Link>
                  <CardHeader>
                    <Link href={`/wigs/${wig.id}`}>
                      <CardTitle className="hover:text-purple-600 transition-colors cursor-pointer">{wig.name}</CardTitle>
                    </Link>
                    <CardDescription>{wig.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-2xl font-bold text-primary">{wig.price}</p>
                      <div className="flex gap-2">
                        <Link href={`/wigs/${wig.id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                        <Button size="sm" onClick={() => handleAddToCart(wig)}>Add to Cart</Button>
                      </div>
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
