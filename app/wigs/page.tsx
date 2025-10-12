import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WigsPage() {
  const wigs = [
    { name: "Lace Front Wig - Natural Black", price: "$280", description: "100% human hair, natural hairline", image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800" },
    { name: "Full Lace Wig - Brown", price: "$320", description: "Premium quality, versatile styling", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800" },
    { name: "Synthetic Wig - Blonde", price: "$120", description: "Affordable, heat-resistant fiber", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800" },
    { name: "Bob Wig - Auburn", price: "$250", description: "Trendy bob cut, natural look", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800" },
    { name: "Long Curly Wig", price: "$300", description: "Gorgeous curls, full volume", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800" },
    { name: "Pixie Cut Wig", price: "$180", description: "Short and chic style", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800" },
  ]

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
              {wigs.map((wig, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${wig.image})` }} />
                  <CardHeader>
                    <CardTitle>{wig.name}</CardTitle>
                    <CardDescription>{wig.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">{wig.price}</p>
                      <Button>Add to Cart</Button>
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
