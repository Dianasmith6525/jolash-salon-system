'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, Scissors, Palette, Sparkles, Hand, Eye, Massage, Star } from "lucide-react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: number;
  image_url: string;
}

const serviceCategories = {
  hair: {
    title: "Hair Services",
    icon: <Scissors className="h-6 w-6" />,
    keywords: ["haircut", "cut", "buzz", "beard", "mustache", "blowout", "styling", "updo", "wedding hair", "prom hair", "curling", "straightening", "consultation", "wash", "dry"]
  },
  coloring: {
    title: "Hair Coloring",
    icon: <Palette className="h-6 w-6" />,
    keywords: ["color", "highlight", "lowlight", "balayage", "ombre", "fashion", "gloss", "root", "correction"]
  },
  treatments: {
    title: "Hair Treatments",
    icon: <Sparkles className="h-6 w-6" />,
    keywords: ["conditioning", "keratin", "mask", "scalp", "olaplex", "oil", "treatment"]
  },
  extensions: {
    title: "Extensions & Wigs",
    icon: <Star className="h-6 w-6" />,
    keywords: ["extension", "wig", "tape", "clip", "sew", "lace", "replacement"]
  },
  nails: {
    title: "Nail Services",
    icon: <Hand className="h-6 w-6" />,
    keywords: ["manicure", "pedicure", "gel", "acrylic", "french", "nail", "dip"]
  },
  facial: {
    title: "Facial & Skin",
    icon: <Eye className="h-6 w-6" />,
    keywords: ["facial", "chemical", "microdermabrasion", "led", "oxygen", "eyebrow", "eyelash", "lash", "dermaplaning"]
  },
  waxing: {
    title: "Waxing Services",
    icon: <Massage className="h-6 w-6" />,
    keywords: ["wax", "brazilian", "bikini", "leg", "arm", "back", "chest", "underarm"]
  },
  makeup: {
    title: "Makeup & Beauty",
    icon: <Sparkles className="h-6 w-6" />,
    keywords: ["makeup", "bridal", "prom", "airbrush", "photoshoot", "lesson"]
  },
  wellness: {
    title: "Wellness & Packages",
    icon: <Massage className="h-6 w-6" />,
    keywords: ["massage", "package", "spa", "trial", "mother", "girls"]
  }
};

export default function FeaturesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("hair");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categorizeServices = (services: Service[]) => {
    const categorized: { [key: string]: Service[] } = {};
    
    Object.keys(serviceCategories).forEach(category => {
      categorized[category] = [];
    });

    services.forEach(service => {
      let categorized_service = false;
      
      Object.entries(serviceCategories).forEach(([categoryKey, categoryData]) => {
        if (!categorized_service) {
          const serviceNameLower = service.name.toLowerCase();
          const serviceDescLower = service.description.toLowerCase();
          
          if (categoryData.keywords.some(keyword => 
            serviceNameLower.includes(keyword) || serviceDescLower.includes(keyword)
          )) {
            categorized[categoryKey].push(service);
            categorized_service = true;
          }
        }
      });
    });

    return categorized;
  };

  const categorizedServices = categorizeServices(services);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading our amazing services...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover our comprehensive range of professional salon services designed to make you look and feel your absolute best. 
              From cutting-edge hair styling to luxurious spa treatments, we offer everything you need for your complete beauty transformation.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>85+ Professional Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>Expert Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <span>Premium Products</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-12 bg-gray-100 dark:bg-gray-800">
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex flex-col items-center gap-1 px-2 py-3 text-xs"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(serviceCategories).map(([categoryKey, categoryData]) => (
                <TabsContent key={categoryKey} value={categoryKey} className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                      {categoryData.icon}
                      <h2 className="text-3xl font-bold">{categoryData.title}</h2>
                    </div>
                    <p className="text-muted-foreground">
                      {categorizedServices[categoryKey].length} professional services available
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categorizedServices[categoryKey].map((service) => (
                      <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                          <div 
                            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(${service.image_url})` }}
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-purple-700 hover:bg-white">
                              ${service.price}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration} min</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.price}</span>
                            </div>
                          </div>
                          <Link href="/booking">
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              Book Now
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {categorizedServices[categoryKey].length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No services found in this category.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Appointment?</h2>
            <p className="text-xl mb-8 opacity-90">
              Choose from our {services.length} professional services and let our expert team transform your look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
    },
    {
      name: "Waxing",
      description: "Professional waxing services for smooth, hair-free skin",
      price: "$40",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800"
    },
    {
      name: "Makeup Application",
      description: "Professional makeup for any occasion - weddings, events, or photoshoots",
      price: "$95",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800"
    },
    {
      name: "Hair Extensions",
      description: "Premium hair extension installation for length and volume",
      price: "$350",
      duration: "180 min",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800"
    },
    {
      name: "Deep Conditioning",
      description: "Intensive hair conditioning treatment to restore moisture and shine",
      price: "$75",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Our Services</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Discover our comprehensive range of beauty and wellness services
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{service.price}</p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <Button asChild>
                        <Link href="/booking">Book Now</Link>
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
