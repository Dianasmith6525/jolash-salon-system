import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Gift } from "lucide-react"

export default function PromotionsPage() {
  const promotions = [
    {
      title: "New Customer Special",
      description: "Get 20% off your first service",
      discount: "20% OFF",
      code: "WELCOME20",
      expires: "Limited Time",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"
    },
    {
      title: "Bundle & Save",
      description: "Book 3 services, get 15% off total",
      discount: "15% OFF",
      code: "BUNDLE15",
      expires: "Ongoing",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800"
    },
    {
      title: "Referral Reward",
      description: "Refer a friend and both get $25 credit",
      discount: "$25 CREDIT",
      code: "REFER25",
      expires: "Ongoing",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800"
    },
    {
      title: "Birthday Month Special",
      description: "Complimentary upgrade on your birthday",
      discount: "FREE UPGRADE",
      code: "BIRTHDAY",
      expires: "Your Birthday Month",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
    },
    {
      title: "Student Discount",
      description: "Valid student ID gets 10% off",
      discount: "10% OFF",
      code: "STUDENT10",
      expires: "Ongoing",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800"
    },
    {
      title: "Flash Sale",
      description: "Limited time offer on select products",
      discount: "30% OFF",
      code: "FLASH30",
      expires: "This Week Only",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Tag className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-center">Current Promotions</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Save big with our exclusive offers and special deals
            </p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map((promo, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary/20">
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${promo.image})` }}>
                    <Badge className="absolute top-4 right-4 text-lg px-4 py-2">
                      {promo.discount}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      {promo.title}
                    </CardTitle>
                    <CardDescription className="text-base">{promo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Promo Code:</span>
                        <code className="text-sm font-bold text-primary">{promo.code}</code>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{promo.expires}</span>
                      </div>
                      <Button className="w-full">Claim Offer</Button>
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
