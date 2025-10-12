import Header from "@/components/Header"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground text-center">Last updated: October 2025</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul>
                <li>Name, email address, phone number, and contact information</li>
                <li>Appointment booking details and service preferences</li>
                <li>Payment information (processed securely through Authorize.net)</li>
                <li>VIP membership information</li>
                <li>Communication preferences and marketing consent</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Process and manage your appointments and bookings</li>
                <li>Process payments and transactions</li>
                <li>Send appointment reminders and confirmations</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send promotional offers and marketing communications (with your consent)</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site 
                traffic, and understand user preferences. You can control cookie settings through your browser, but 
                disabling cookies may limit certain website features.
              </p>

              <h2>4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist in our operations (payment processors, email services)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>

              <h2>5. Payment Security</h2>
              <p>
                All payment transactions are processed securely through Authorize.net, a PCI-compliant payment gateway. 
                We do not store complete credit card information on our servers.
              </p>

              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
                is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>7. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                policy, unless a longer retention period is required by law.
              </p>

              <h2>9. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
                personal information from children. Services for minors require parental consent.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of significant changes by 
                posting the new policy on our website with an updated effective date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions or concerns about this privacy policy or our data practices, please contact us at:<br />
                Email: privacy@jolashsalon.com<br />
                Phone: (555) 123-4567<br />
                Address: Jolash Salon, 123 Beauty Lane, Your City, ST 12345
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
