import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExtensionsPage() {
  const extensions = [
    { name: "Clip-in Extensions", price: "$150", description: "Easy to apply, instant length", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800" },
    { name: "Tape-in Extensions", price: "$200", description: "Semi-permanent, natural blend", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800" },
    { name: "Sew-in Extensions", price: "$250", description: "Long-lasting, secure attachment", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800" },
  ]

  const hairCare = [
    { name: "Luxury Shampoo", price: "$32", description: "Premium moisturizing formula", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800" },
    { name: "Hydrating Conditioner", price: "$28", description: "Deep hydration treatment", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800" },
    { name: "Hair Mask Treatment", price: "$45", description: "Intensive repair formula", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800" },
    { name: "Hair Oil Treatment", price: "$35", description: "Nourishing natural oils", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800" },
    { name: "Heat Protectant Spray", price: "$26", description: "Thermal protection", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800" },
    { name: "Hair Styling Gel", price: "$22", description: "Strong hold formula", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Extensions & Hair Care</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Premium hair extensions and professional care products
            </p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="extensions" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="extensions">Extensions</TabsTrigger>
                <TabsTrigger value="haircare">Hair Care</TabsTrigger>
              </TabsList>
              <TabsContent value="extensions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {extensions.map((item, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-primary">{item.price}</p>
                          <Button>Add to Cart</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="haircare">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {hairCare.map((item, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-primary">{item.price}</p>
                          <Button>Add to Cart</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
