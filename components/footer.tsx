import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">JOLASH SALON</h3>
            <p className="text-sm text-muted-foreground">
              Your premier destination for luxury beauty services, premium hair care, and exceptional customer experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/features" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/booking" className="text-muted-foreground hover:text-primary">Book Now</Link></li>
              <li><Link href="/jolash-vip" className="text-muted-foreground hover:text-primary">VIP Program</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/best-sellers" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
              <li><Link href="/wigs" className="text-muted-foreground hover:text-primary">Wigs</Link></li>
              <li><Link href="/extensions" className="text-muted-foreground hover:text-primary">Extensions</Link></li>
              <li><Link href="/promotions" className="text-muted-foreground hover:text-primary">Promotions</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li className="text-muted-foreground">Email: info@jolashsalon.com</li>
              <li className="text-muted-foreground">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Jolash Salon. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
