import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Heart, Users, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">About Jolash Salon</h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Your trusted partner in beauty and wellness since 2010
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mb-12">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2010, Jolash Salon has been at the forefront of beauty innovation and exceptional customer service. 
                  What started as a small neighborhood salon has grown into a premier destination for luxury beauty services, 
                  premium hair care products, and transformative beauty experiences.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our team of certified professionals brings decades of combined experience in hair styling, coloring, 
                  skincare, and beauty treatments. We stay current with the latest trends and techniques through continuous 
                  education and training, ensuring our clients receive the best possible service.
                </p>
                <p className="text-muted-foreground">
                  At Jolash Salon, we believe that beauty is personal. That&apos;s why we take the time to understand each 
                  client&apos;s unique needs, preferences, and lifestyle to create customized solutions that enhance their 
                  natural beauty and boost their confidence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Excellence</CardTitle>
                    <CardDescription>
                      Award-winning services recognized by industry leaders and satisfied clients
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Heart className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Passion</CardTitle>
                    <CardDescription>
                      We love what we do and it shows in every service we provide
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Community</CardTitle>
                    <CardDescription>
                      Building lasting relationships with our clients and local community
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Sparkles className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Innovation</CardTitle>
                    <CardDescription>
                      Always exploring new techniques and products to serve you better
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="bg-muted p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To empower individuals through exceptional beauty services and premium products, 
                  helping them look and feel their absolute best every day.
                </p>
                <h2 className="text-3xl font-bold mb-6 mt-8">Our Vision</h2>
                <p className="text-lg text-muted-foreground">
                  To be the most trusted and innovative beauty destination, setting new standards 
                  for quality, service, and customer satisfaction in the industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
