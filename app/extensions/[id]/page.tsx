'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft, Check, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Extension {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  type: 'extension' | 'haircare';
  features: string[];
  specifications: { label: string; value: string }[];
  benefits: string[];
}

const extensionsData: Extension[] = [
  {
    id: 'clip-in-extensions',
    name: "Clip-in Extensions",
    price: "$150",
    priceValue: 150,
    description: "Easy-to-apply clip-in hair extensions for instant length and volume. Perfect for special occasions or daily wear.",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
    type: 'extension',
    features: [
      "Quick and easy application",
      "No salon visit required",
      "Reusable and versatile",
      "100% human hair",
      "Natural color blend",
      "Damage-free attachment"
    ],
    specifications: [
      { label: "Length", value: "16-22 inches" },
      { label: "Weight", value: "120-140 grams" },
      { label: "Pieces", value: "7-piece set" },
      { label: "Hair Type", value: "Remy Human Hair" },
      { label: "Application", value: "Clip-in" },
      { label: "Lifespan", value: "6-12 months" }
    ],
    benefits: [
      "Add instant length and volume",
      "Perfect for thin or fine hair",
      "Remove easily for washing",
      "Style with heat tools"
    ]
  },
  {
    id: 'tape-in-extensions',
    name: "Tape-in Extensions",
    price: "$200",
    priceValue: 200,
    description: "Semi-permanent tape-in extensions that blend naturally with your hair. Long-lasting and comfortable.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800",
    type: 'extension',
    features: [
      "Semi-permanent solution",
      "Natural, seamless blend",
      "Lightweight and comfortable",
      "Professional application",
      "Reusable with maintenance",
      "Long-lasting hold"
    ],
    specifications: [
      { label: "Length", value: "18-24 inches" },
      { label: "Weight", value: "40-60 grams per pack" },
      { label: "Pieces", value: "20-40 pieces" },
      { label: "Hair Type", value: "Premium Remy Hair" },
      { label: "Application", value: "Tape-in (Professional)" },
      { label: "Duration", value: "6-8 weeks per application" }
    ],
    benefits: [
      "Lay flat against the scalp",
      "No visible attachment points",
      "Quick professional application",
      "Can be reused 2-3 times"
    ]
  },
  {
    id: 'sew-in-extensions',
    name: "Sew-in Extensions",
    price: "$250",
    priceValue: 250,
    description: "Long-lasting sew-in extensions with secure attachment. Best for thick hair and maximum longevity.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    type: 'extension',
    features: [
      "Most secure attachment",
      "Long-lasting results",
      "Best for thick hair",
      "Professional installation",
      "Natural movement",
      "Maximum durability"
    ],
    specifications: [
      { label: "Length", value: "14-26 inches" },
      { label: "Weight", value: "100-150 grams per bundle" },
      { label: "Bundles", value: "2-3 bundles" },
      { label: "Hair Type", value: "Virgin Remy Hair" },
      { label: "Application", value: "Sew-in (Professional)" },
      { label: "Duration", value: "2-3 months" }
    ],
    benefits: [
      "Most secure and long-lasting",
      "Perfect for active lifestyles",
      "Can swim and exercise freely",
      "Maintains style integrity"
    ]
  },
  {
    id: 'luxury-shampoo',
    name: "Luxury Shampoo",
    price: "$32",
    priceValue: 32,
    description: "Premium moisturizing shampoo formulated for color-treated and extension hair. Sulfate-free and gentle.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    type: 'haircare',
    features: [
      "Sulfate-free formula",
      "Color-safe protection",
      "Deep moisturizing",
      "Extension-friendly",
      "Natural ingredients",
      "Professional grade"
    ],
    specifications: [
      { label: "Size", value: "8 oz / 237 ml" },
      { label: "Type", value: "Moisturizing Shampoo" },
      { label: "Formula", value: "Sulfate-free" },
      { label: "pH Level", value: "5.5 (Balanced)" },
      { label: "Suitable For", value: "All hair types" },
      { label: "Origin", value: "Professional Salon" }
    ],
    benefits: [
      "Gentle on extensions",
      "Maintains color vibrancy",
      "Adds shine and softness",
      "Reduces frizz"
    ]
  },
  {
    id: 'hydrating-conditioner',
    name: "Hydrating Conditioner",
    price: "$28",
    priceValue: 28,
    description: "Deep hydration treatment conditioner that nourishes and protects. Perfect for dry and damaged hair.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800",
    type: 'haircare',
    features: [
      "Deep hydration",
      "Protein-enriched",
      "Detangling formula",
      "Strengthens hair",
      "Thermal protection",
      "Salon quality"
    ],
    specifications: [
      { label: "Size", value: "8 oz / 237 ml" },
      { label: "Type", value: "Deep Conditioner" },
      { label: "Key Ingredients", value: "Keratin, Argan Oil" },
      { label: "Treatment Time", value: "3-5 minutes" },
      { label: "Suitable For", value: "Dry/Damaged Hair" },
      { label: "Finish", value: "Smooth & Silky" }
    ],
    benefits: [
      "Repairs damage",
      "Prevents breakage",
      "Enhances manageability",
      "Leaves hair soft and shiny"
    ]
  },
  {
    id: 'hair-mask-treatment',
    name: "Hair Mask Treatment",
    price: "$45",
    priceValue: 45,
    description: "Intensive repair formula for deeply damaged hair. Weekly treatment for maximum restoration.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
    type: 'haircare',
    features: [
      "Intensive repair",
      "Deep penetration",
      "Weekly treatment",
      "Restores elasticity",
      "Rich nourishment",
      "Professional results"
    ],
    specifications: [
      { label: "Size", value: "6 oz / 177 ml" },
      { label: "Type", value: "Intensive Mask" },
      { label: "Key Ingredients", value: "Proteins, Vitamins" },
      { label: "Treatment Time", value: "10-20 minutes" },
      { label: "Frequency", value: "Weekly" },
      { label: "Results", value: "Visible after 1 use" }
    ],
    benefits: [
      "Reverses damage",
      "Strengthens from within",
      "Restores shine",
      "Improves texture dramatically"
    ]
  },
  {
    id: 'hair-oil-treatment',
    name: "Hair Oil Treatment",
    price: "$35",
    priceValue: 35,
    description: "Nourishing blend of natural oils for shine, strength, and protection. Lightweight and non-greasy.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800",
    type: 'haircare',
    features: [
      "Natural oil blend",
      "Lightweight formula",
      "Multi-purpose use",
      "Frizz control",
      "Heat protection",
      "Non-greasy finish"
    ],
    specifications: [
      { label: "Size", value: "2 oz / 59 ml" },
      { label: "Type", value: "Hair Oil Serum" },
      { label: "Key Oils", value: "Argan, Coconut, Jojoba" },
      { label: "Application", value: "Damp or dry hair" },
      { label: "Frequency", value: "Daily" },
      { label: "Finish", value: "Glossy" }
    ],
    benefits: [
      "Instant shine boost",
      "Tames flyaways",
      "Protects from heat damage",
      "Seals split ends"
    ]
  },
  {
    id: 'heat-protectant-spray',
    name: "Heat Protectant Spray",
    price: "$26",
    priceValue: 26,
    description: "Thermal protection spray that shields hair from heat styling damage up to 450°F.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    type: 'haircare',
    features: [
      "Heat protection up to 450°F",
      "Lightweight mist",
      "Quick-drying",
      "Adds shine",
      "Prevents breakage",
      "Essential for styling"
    ],
    specifications: [
      { label: "Size", value: "6 oz / 177 ml" },
      { label: "Type", value: "Heat Protectant" },
      { label: "Protection", value: "Up to 450°F" },
      { label: "Application", value: "Spray on damp hair" },
      { label: "Finish", value: "Natural" },
      { label: "Suitable For", value: "All styling tools" }
    ],
    benefits: [
      "Prevents heat damage",
      "Reduces styling time",
      "Maintains hair health",
      "Essential for flat irons & curlers"
    ]
  },
  {
    id: 'hair-styling-gel',
    name: "Hair Styling Gel",
    price: "$22",
    priceValue: 22,
    description: "Strong hold styling gel for sleek styles and defined looks. Non-flaking formula.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800",
    type: 'haircare',
    features: [
      "Strong hold",
      "Non-flaking",
      "Non-sticky",
      "Humidity resistant",
      "Adds shine",
      "Easy to wash out"
    ],
    specifications: [
      { label: "Size", value: "8 oz / 237 ml" },
      { label: "Type", value: "Styling Gel" },
      { label: "Hold Level", value: "Strong (8/10)" },
      { label: "Finish", value: "High Shine" },
      { label: "Formula", value: "Alcohol-free" },
      { label: "Suitable For", value: "All hair types" }
    ],
    benefits: [
      "Long-lasting hold",
      "Perfect for slick backs",
      "Defines edges",
      "Controls flyaways"
    ]
  }
];

export default function ExtensionDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Extension | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const foundItem = extensionsData.find(e => e.id === params.id);
    setItem(foundItem || null);
  }, [params.id]);

  const handleAddToCart = () => {
    if (!item) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingIndex = cart.findIndex((cartItem: any) => cartItem.name === item.name);
      
      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: `ext-${Date.now()}`,
          name: item.name,
          price: item.priceValue,
          image: item.image,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (e) {
      alert('Error adding to cart.');
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
              <p className="text-gray-600 mb-6">This item does not exist in our collection.</p>
              <Link href="/extensions">
                <Button>Browse Extensions & Hair Care</Button>
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
            href="/extensions"
            className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Extensions & Hair Care
          </Link>

          {/* Item Detail */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative">
              <Card className="overflow-hidden">
                <div className="relative h-[500px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-purple-600">
                      {item.type === 'extension' ? 'Hair Extension' : 'Hair Care'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600">(4.9/5.0)</span>
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-4">{item.price}</p>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {item.features.map((feature, index) => (
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
                    {item.specifications.map((spec, index) => (
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
                  Free shipping on orders over $75 • 30-day satisfaction guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Benefits & Why Choose This Product</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {item.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
