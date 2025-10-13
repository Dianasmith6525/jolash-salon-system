'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Calendar, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/services/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Service not found');
        }
        
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  const handleBookNow = () => {
    // Navigate to booking page with service pre-selected
    router.push(`/booking?service=${params.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
              <p className="text-gray-600 mb-6">{error || 'This service does not exist.'}</p>
              <Link href="/features">
                <Button>Browse All Services</Button>
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
            href="/features"
            className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>

          {/* Service Detail Card */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Image/Icon Section */}
            <div className="relative">
              <Card className="overflow-hidden h-full">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-[400px] flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <Star className="h-16 w-16" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                    <Badge className="bg-white text-purple-600 hover:bg-white">
                      {service.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>

              {/* Service Details */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Price</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      ${service.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <span className="text-lg font-semibold">
                      {service.duration} minutes
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Category</span>
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Service Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Professional consultation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Premium products and tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Expert stylist service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Aftercare advice and tips</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Book Now Button */}
              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                  onClick={handleBookNow}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book This Service
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Available for booking • Easy rescheduling • Professional service
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Expert Professionals</h3>
                <p className="text-sm text-gray-600">
                  Our certified stylists have years of experience
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Flexible Scheduling</h3>
                <p className="text-sm text-gray-600">
                  Book at your convenience with easy rescheduling
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Best Value</h3>
                <p className="text-sm text-gray-600">
                  Premium quality service at competitive prices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
