import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Calendar, ShoppingBag, Award, Heart, Star, Scissors, Palette, Eye } from "lucide-react"

export default function Home() {
  const featuredServices = [
    {
      title: "Hair Styling",
      description: "Expert cuts and styling",
      price: "$65",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
      icon: <Scissors className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Hair Coloring",
      description: "Premium color treatments",
      price: "$150",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
      icon: <Palette className="h-8 w-8" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Manicure & Pedicure",
      description: "Complete nail care",
      price: "$100",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
      icon: <Heart className="h-8 w-8" />,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Facial Treatment",
      description: "Rejuvenating skincare",
      price: "$85",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
      icon: <Eye className="h-8 w-8" />,
      gradient: "from-emerald-500 to-teal-500"
    }
  ]

  const bestSellers = [
    {
      name: "Luxury Shampoo",
      price: "$32",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
      rating: 5
    },
    {
      name: "Lace Front Wig",
      price: "$280",
      image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800",
      rating: 5
    },
    {
      name: "Facial Serum",
      price: "$65",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with 3D Elements */}
        <section className="relative h-[700px] flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950 overflow-hidden">
          {/* 3D Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Beauty Products */}
            <div className="absolute top-20 left-10 animate-float delay-0">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-2xl transform rotate-12 opacity-80">
                <div className="w-full h-full bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Scissors className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-40 right-16 animate-float delay-1000">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-2xl transform -rotate-12 opacity-80">
                <div className="w-full h-full bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <Palette className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 left-20 animate-float delay-2000">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl shadow-2xl transform rotate-45 opacity-80">
                <div className="w-full h-full bg-white/20 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                  <Heart className="h-12 w-12 text-white transform -rotate-45" />
                </div>
              </div>
            </div>

            <div className="absolute top-32 right-32 animate-float delay-1500">
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-2xl transform -rotate-6 opacity-80">
                <div className="w-full h-full bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Star className="h-9 w-9 text-white" />
                </div>
              </div>
            </div>

            {/* Additional floating shapes */}
            <div className="absolute bottom-20 right-12 animate-bounce-slow">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl opacity-70"></div>
            </div>

            <div className="absolute top-64 left-32 animate-pulse-slow">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg opacity-60"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm border-white/30 text-purple-800 dark:text-purple-200 hover:bg-white/30 transition-all duration-300" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium Beauty Experience
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient-x">
                Jolash Salon
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Your destination for luxury beauty services, premium hair care, wigs, extensions and exceptional customer care
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-300 hover:border-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/best-sellers">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
            </div>

            {/* 3D Statistics Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">85+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Professional Services</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-pink-700 dark:text-pink-300">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-rose-700 dark:text-rose-300">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Expert Stylists</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services with 3D Cards */}
        <section className="py-20 bg-background relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                <Star className="h-3 w-3 mr-1" />
                Featured Services
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                Our Signature Treatments
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience our most popular beauty treatments designed to make you look and feel amazing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredServices.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-800"
                >
                  {/* 3D Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Icon */}
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 text-gray-800 font-bold text-lg px-3 py-1">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      asChild
                    >
                      <Link href="/booking">
                        Book Now
                        <Calendar className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full opacity-20 transform group-hover:scale-125 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers with 3D Product Cards */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-0">
                <Award className="h-3 w-3 mr-1" />
                Best Sellers
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Customer Favorites
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the products our customers can't stop raving about
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bestSellers.map((product, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 border border-gray-100 dark:border-gray-800"
                >
                  {/* 3D Product Image */}
                  <div className="relative h-72 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-125 group-hover:rotate-3 transition-transform duration-700"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Rating Stars */}
                    <div className="absolute top-4 left-4 flex space-x-1">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Bestseller Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold animate-pulse">
                        Bestseller
                      </Badge>
                    </div>
                    
                    {/* Floating Add to Cart */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Button size="sm" className="bg-white text-gray-800 hover:bg-gray-100 shadow-lg">
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1 group-hover:text-purple-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {product.price}
                        </p>
                      </div>
                    </div>
                    
                    {/* 3D Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      View Product
                      <Eye className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 3D Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/80 backdrop-blur-sm border-2 border-purple-300 hover:border-purple-500 hover:bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/best-sellers">
                  View All Best Sellers
                  <Star className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Jolash Salon</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Expert Stylists</CardTitle>
                  <CardDescription>
                    Our team of certified professionals brings years of experience and passion to every service
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Premium Products</CardTitle>
                  <CardDescription>
                    We use only the finest quality products for all our treatments and retail offerings
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>VIP Experience</CardTitle>
                  <CardDescription>
                    Join our VIP program for exclusive benefits, discounts, and priority booking
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-xl mb-8 opacity-90">
              Book your appointment today and experience the Jolash difference
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Now
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
