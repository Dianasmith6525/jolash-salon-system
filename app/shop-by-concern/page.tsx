import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShopByConcernPage() {
  const concerns = [
    {
      title: "Dry & Damaged Hair",
      description: "Restore moisture and repair damaged strands",
      products: ["Hair Mask Treatment", "Hydrating Conditioner", "Hair Oil Treatment"],
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800"
    },
    {
      title: "Hair Loss & Thinning",
      description: "Strengthen and promote healthy hair growth",
      products: ["Hair Growth Serum", "Volumizing Shampoo", "Scalp Treatment"],
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"
    },
    {
      title: "Frizzy Hair",
      description: "Smooth and control unruly hair",
      products: ["Anti-Frizz Serum", "Smoothing Cream", "Heat Protectant"],
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800"
    },
    {
      title: "Color-Treated Hair",
      description: "Protect and maintain vibrant color",
      products: ["Color Protection Shampoo", "UV Protection Spray", "Color Lock Conditioner"],
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800"
    },
    {
      title: "Aging Skin",
      description: "Anti-aging treatments for youthful skin",
      products: ["Facial Serum", "Retinol Cream", "Eye Treatment"],
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
    },
    {
      title: "Acne & Blemishes",
      description: "Clear and prevent breakouts",
      products: ["Acne Treatment", "Clarifying Cleanser", "Spot Treatment"],
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Shop By Concern</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Find the perfect products for your specific beauty needs
            </p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {concerns.map((concern, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${concern.image})` }} />
                  <CardHeader>
                    <CardTitle>{concern.title}</CardTitle>
                    <CardDescription>{concern.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {concern.products.map((product, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {product}</li>
                      ))}
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/best-sellers">Shop Solutions</Link>
                    </Button>
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
