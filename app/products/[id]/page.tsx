'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
}

const productsData: Product[] = [
  {
    id: 'facial-serum',
    name: "Rejuvenating Facial Serum",
    price: "$65",
    priceValue: 65,
    description: "Advanced anti-aging serum with hyaluronic acid and vitamin C. Reduces fine lines and brightens skin tone.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    features: [
      "Hyaluronic acid hydration",
      "Vitamin C brightening",
      "Reduces fine lines",
      "Non-greasy formula",
      "Suitable for all skin types",
      "Dermatologist tested"
    ],
    specifications: [
      { label: "Size", value: "1 fl oz / 30 ml" },
      { label: "Type", value: "Anti-Aging Serum" },
      { label: "Key Ingredients", value: "Hyaluronic Acid, Vitamin C" },
      { label: "Suitable For", value: "All skin types" },
      { label: "Application", value: "Morning & Night" },
      { label: "Origin", value: "Professional Skincare" }
    ]
  }
];

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = productsData.find(p => p.id === params.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-16">
                    <Card className="p-8 text-center">
                        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            Sorry, we couldn't find the product you're looking for.
                        </p>
                        <Link href="/best-sellers">
                            <Button>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Products
                            </Button>
                        </Link>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    // Add to Cart handler
    const handleAddToCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            // Check if product already in cart
            const existingItem = cart.find((item: any) => item.id === product.id);
            if (existingItem) {
                toast.error(`${product.name} is already in your cart!`);
                return;
            }
            
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                type: 'product',
                quantity: 1
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Dispatch custom event for cart updates
            window.dispatchEvent(new Event('cartUpdated'));
            
            toast.success(`${product.name} added to cart!`);
        } catch (e) {
            toast.error('Error adding to cart.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-16">
                    {/* Back Button */}
                    <Link href="/best-sellers" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-muted-foreground">(5.0/5.0)</span>
                                </div>
                                <p className="text-3xl font-bold text-purple-600">{product.price}</p>
                            </div>

                            <p className="text-lg text-muted-foreground">{product.description}</p>

                            {/* Features */}
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Specifications</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.specifications.map((spec, index) => (
                                        <div key={index} className="border rounded-lg p-3">
                                            <div className="text-sm text-muted-foreground">{spec.label}</div>
                                            <div className="font-medium">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <Button 
                                onClick={handleAddToCart}
                                size="lg"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>

                            {/* Browse More */}
                            <Link href="/best-sellers">
                                <Button variant="outline" size="lg" className="w-full">
                                    Browse All Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}