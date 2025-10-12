import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Gift, Calendar, Percent, Sparkles } from "lucide-react"

export default function JolashVIPPage() {
  const benefits = [
    { icon: Percent, title: "20% Off All Services", description: "Exclusive discount on every appointment" },
    { icon: Gift, title: "Birthday Gift", description: "Complimentary service during your birthday month" },
    { icon: Calendar, title: "Priority Booking", description: "Get first access to appointment slots" },
    { icon: Star, title: "Exclusive Products", description: "Early access to new product launches" },
    { icon: Sparkles, title: "Free Upgrades", description: "Complimentary treatment upgrades quarterly" },
    { icon: Crown, title: "VIP Events", description: "Invitations to exclusive member-only events" }
  ]

  const tiers = [
    {
      name: "Silver VIP",
      price: "$99/year",
      benefits: ["10% off all services", "Priority booking", "Birthday gift"],
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Gold VIP",
      price: "$199/year",
      benefits: ["15% off all services", "Priority booking", "Birthday gift", "Free quarterly upgrade", "VIP events"],
      color: "from-yellow-400 to-yellow-600",
      popular: true
    },
    {
      name: "Platinum VIP",
      price: "$299/year",
      benefits: ["20% off all services", "Priority booking", "Birthday gift", "Free monthly upgrade", "VIP events", "Exclusive products", "Personal stylist"],
      color: "from-purple-400 to-purple-600"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4 text-center">
            <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Jolash VIP Program</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our exclusive VIP program and enjoy premium benefits, priority service, and special rewards
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">VIP Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <benefit.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier, index) => (
                <Card key={index} className={`relative overflow-hidden ${tier.popular ? 'border-2 border-primary shadow-xl' : ''}`}>
                  {tier.popular && (
                    <Badge className="absolute top-4 right-4">Most Popular</Badge>
                  )}
                  <div className={`h-32 bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                    <Crown className="h-16 w-16 text-white" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">{tier.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                      Join {tier.name}
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
