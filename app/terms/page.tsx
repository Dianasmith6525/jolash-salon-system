import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Terms & Conditions</h1>
            <p className="text-xl text-muted-foreground text-center">Last updated: October 2025</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Jolash Salon&apos;s website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>

              <h2>2. Services</h2>
              <p>
                Jolash Salon provides beauty and wellness services including but not limited to hair styling, coloring, 
                nail care, skincare treatments, and retail of beauty products. All services are subject to availability 
                and may be modified or discontinued at any time.
              </p>

              <h2>3. Booking and Appointments</h2>
              <p>
                Appointments must be booked in advance through our website, phone, or in person. We require at least 
                24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to 
                a cancellation fee of up to 50% of the service cost.
              </p>

              <h2>4. Payment Terms</h2>
              <p>
                Payment is due at the time of service. We accept cash, credit cards, and debit cards. All prices are 
                subject to change without notice. Gratuities are not included in service prices and are at the 
                customer&apos;s discretion.
              </p>

              <h2>5. Product Sales</h2>
              <p>
                All product sales are final. We do not offer refunds on opened or used products. Unopened products 
                may be returned within 14 days of purchase with original receipt for store credit only.
              </p>

              <h2>6. VIP Membership</h2>
              <p>
                VIP membership fees are non-refundable. Membership benefits are subject to change. Members must maintain 
                active membership status to receive benefits. Membership may be cancelled at any time but no refunds 
                will be issued for unused time.
              </p>

              <h2>7. Liability</h2>
              <p>
                While we take every precaution to ensure your safety and satisfaction, Jolash Salon is not liable for 
                any allergic reactions, skin sensitivities, or adverse effects from services or products. Clients are 
                responsible for disclosing any allergies, medical conditions, or sensitivities prior to service.
              </p>

              <h2>8. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of 
                Jolash Salon and protected by copyright laws. Unauthorized use is prohibited.
              </p>

              <h2>9. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, 
                and protect your personal information.
              </p>

              <h2>10. Modifications</h2>
              <p>
                Jolash Salon reserves the right to modify these terms at any time. Continued use of our services 
                constitutes acceptance of modified terms.
              </p>

              <h2>11. Contact Information</h2>
              <p>
                For questions about these terms, please contact us at:<br />
                Email: info@jolashsalon.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
