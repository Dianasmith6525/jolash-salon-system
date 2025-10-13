'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Wig {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
}

const wigsData: Wig[] = [
  { 
    id: 'lace-front-natural-black',
    name: "Lace Front Wig - Natural Black", 
    price: "$280", 
    priceValue: 280,
    description: "100% human hair lace front wig with a natural hairline. Perfect for everyday wear with seamless blending and comfortable fit.",
    image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800",
    features: [
      "100% premium human hair",
      "Natural-looking hairline",
      "Pre-plucked and bleached knots",
      "Adjustable straps for secure fit",
      "Heat-styleable up to 350°F",
      "Long-lasting durability"
    ],
    specifications: [
      { label: "Hair Type", value: "Human Hair" },
      { label: "Cap Size", value: "Average (adjustable)" },
      { label: "Hair Length", value: "16-20 inches" },
      { label: "Hair Texture", value: "Natural Straight" },
      { label: "Color", value: "Natural Black (#1B)" },
      { label: "Weight", value: "Lightweight" }
    ]
  },
  { 
    id: 'full-lace-brown',
    name: "Full Lace Wig - Brown", 
    price: "$320", 
    priceValue: 320,
    description: "Premium quality full lace wig offering maximum versatility in styling. Can be parted anywhere and styled in high ponytails.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
    features: [
      "360° full lace coverage",
      "Style in any direction",
      "High ponytail capable",
      "Baby hairs for natural look",
      "Breathable cap construction",
      "Professional grade quality"
    ],
    specifications: [
      { label: "Hair Type", value: "Premium Human Hair" },
      { label: "Cap Size", value: "Medium (customizable)" },
      { label: "Hair Length", value: "18-22 inches" },
      { label: "Hair Texture", value: "Body Wave" },
      { label: "Color", value: "Medium Brown (#4)" },
      { label: "Density", value: "130-150%" }
    ]
  },
  { 
    id: 'synthetic-blonde',
    name: "Synthetic Wig - Blonde", 
    price: "$120", 
    priceValue: 120,
    description: "Affordable and stylish synthetic wig made with heat-resistant fiber. Perfect for daily wear and easy maintenance.",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
    features: [
      "Heat-resistant synthetic fiber",
      "Pre-styled and ready to wear",
      "Low maintenance required",
      "Color-safe and fade-resistant",
      "Budget-friendly option",
      "Great for beginners"
    ],
    specifications: [
      { label: "Hair Type", value: "Synthetic Fiber" },
      { label: "Cap Size", value: "One Size Fits Most" },
      { label: "Hair Length", value: "14-16 inches" },
      { label: "Hair Texture", value: "Straight" },
      { label: "Color", value: "Blonde (#613)" },
      { label: "Heat Safe", value: "Up to 250°F" }
    ]
  },
  { 
    id: 'bob-auburn',
    name: "Bob Wig - Auburn", 
    price: "$250", 
    priceValue: 250,
    description: "Trendy bob cut wig with a natural, sophisticated look. Perfect length for professional and casual settings.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    features: [
      "Chic bob cut style",
      "Natural auburn color",
      "Face-framing layers",
      "Minimal styling required",
      "Comfortable daily wear",
      "Professional appearance"
    ],
    specifications: [
      { label: "Hair Type", value: "Human Hair Blend" },
      { label: "Cap Size", value: "Average" },
      { label: "Hair Length", value: "10-12 inches" },
      { label: "Hair Texture", value: "Straight Bob" },
      { label: "Color", value: "Auburn (#33)" },
      { label: "Style", value: "Pre-cut Bob" }
    ]
  },
  { 
    id: 'long-curly',
    name: "Long Curly Wig", 
    price: "$300", 
    priceValue: 300,
    description: "Gorgeous long curly wig with full volume and bounce. Perfect for special occasions or glamorous everyday looks.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800",
    features: [
      "Voluminous curly texture",
      "Long flowing length",
      "Defined curl pattern",
      "Soft and bouncy",
      "Heat-friendly",
      "Show-stopping appearance"
    ],
    specifications: [
      { label: "Hair Type", value: "Premium Human Hair" },
      { label: "Cap Size", value: "Large (adjustable)" },
      { label: "Hair Length", value: "22-24 inches" },
      { label: "Hair Texture", value: "Deep Curly" },
      { label: "Color", value: "Natural Black" },
      { label: "Density", value: "150-180%" }
    ]
  },
  { 
    id: 'pixie-cut',
    name: "Pixie Cut Wig", 
    price: "$180", 
    priceValue: 180,
    description: "Short and chic pixie cut wig for a bold, modern look. Easy to wear and maintain with maximum comfort.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
    features: [
      "Short pixie cut style",
      "Lightweight and comfortable",
      "Easy to maintain",
      "Modern and trendy",
      "Breathable cap",
      "Quick to style"
    ],
    specifications: [
      { label: "Hair Type", value: "Human Hair" },
      { label: "Cap Size", value: "Petite to Average" },
      { label: "Hair Length", value: "4-6 inches" },
      { label: "Hair Texture", value: "Straight Pixie" },
      { label: "Color", value: "Dark Brown (#2)" },
      { label: "Weight", value: "Ultra-light" }
    ]
  },
];

export default function WigDetailPage({ params }: { params: { id: string } }) {
  const [wig, setWig] = useState<Wig | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const foundWig = wigsData.find(w => w.id === params.id);
    setWig(foundWig || null);
  }, [params.id]);

  const handleAddToCart = () => {
    if (!wig) return;

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
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (e) {
      alert('Error adding to cart.');
    }
  };

  if (!wig) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Wig Not Found</h2>
              <p className="text-gray-600 mb-6">This wig does not exist in our collection.</p>
              <Link href="/wigs">
                <Button>Browse All Wigs</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link 
            href="/wigs"
            className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wigs Collection
          </Link>

          {/* Wig Detail */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative">
              <Card className="overflow-hidden">
                <div className="relative h-[500px]">
                  <Image
                    src={wig.image}
                    alt={wig.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{wig.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600">(4.8/5.0)</span>
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-4">{wig.price}</p>
                <p className="text-gray-600 leading-relaxed">{wig.description}</p>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {wig.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {wig.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b last:border-0">
                        <span className="font-medium text-gray-700">{spec.label}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Free shipping on orders over $200 • 30-day return policy
                </p>
              </div>
            </div>
          </div>

          {/* Care Instructions */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Care Instructions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Washing</h3>
                  <p className="text-sm text-gray-600">
                    Wash with lukewarm water and sulfate-free shampoo. Gently detangle before washing.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Styling</h3>
                  <p className="text-sm text-gray-600">
                    Use heat protectant before styling. Avoid excessive heat on synthetic fibers.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Storage</h3>
                  <p className="text-sm text-gray-600">
                    Store on a wig stand in a cool, dry place away from direct sunlight.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
