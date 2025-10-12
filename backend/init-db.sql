-- Create database
CREATE DATABASE IF NOT EXISTS jolash_salon;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  service_id INTEGER REFERENCES services(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cookie consent table
CREATE TABLE IF NOT EXISTS cookie_consents (
  id SERIAL PRIMARY KEY,
  user_ip VARCHAR(50),
  consent_given BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert comprehensive salon services
INSERT INTO services (name, description, price, duration, image_url) VALUES

-- HAIR SERVICES
('Classic Haircut', 'Professional haircut with consultation and basic styling', 65.00, 60, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'),
('Designer Haircut', 'Premium designer cut with senior stylist', 95.00, 75, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'),
('Buzz Cut', 'Short all-over buzz cut', 35.00, 30, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800'),
('Beard Trim', 'Professional beard shaping and trimming', 25.00, 20, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'),
('Mustache Trim', 'Precise mustache grooming', 15.00, 15, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800'),

-- HAIR COLORING
('Full Hair Color', 'Complete hair coloring service with premium products', 150.00, 120, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'),
('Root Touch-Up', 'Color refresh for roots only', 85.00, 60, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800'),
('Highlights', 'Beautiful foil highlights to enhance your look', 120.00, 90, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800'),
('Lowlights', 'Dimensional lowlight color service', 110.00, 90, 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800'),
('Balayage', 'Hand-painted natural highlighting technique', 180.00, 120, 'https://images.unsplash.com/photo-1594824388937-acdcd844c71d?w=800'),
('Ombre Hair', 'Gradient color transition styling', 160.00, 110, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Color Correction', 'Fix and correct previous color treatments', 250.00, 180, 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800'),
('Fashion Colors', 'Bold and vibrant fashion color application', 200.00, 150, 'https://images.unsplash.com/photo-1594824388937-acdcd844c71d?w=800'),
('Gloss Treatment', 'Shine and color enhancing gloss', 75.00, 45, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800'),

-- HAIR TREATMENTS
('Deep Conditioning', 'Intensive hair conditioning and repair treatment', 75.00, 45, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800'),
('Keratin Treatment', 'Smoothing keratin hair treatment', 350.00, 180, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Hair Mask', 'Nourishing hair mask application', 55.00, 30, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800'),
('Scalp Treatment', 'Therapeutic scalp massage and treatment', 85.00, 60, 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800'),
('Olaplex Treatment', 'Bond rebuilding hair treatment', 120.00, 75, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Hot Oil Treatment', 'Moisturizing hot oil hair treatment', 45.00, 30, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800'),

-- STYLING SERVICES
('Blowout', 'Professional wash and blow dry styling', 55.00, 45, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'),
('Updo Styling', 'Elegant updo for special occasions', 85.00, 60, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Wedding Hair', 'Bridal hair styling and consultation', 150.00, 90, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Prom Hair', 'Special occasion prom hairstyling', 95.00, 75, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Curling Service', 'Professional curling and styling', 65.00, 45, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800'),
('Straightening Service', 'Professional hair straightening', 55.00, 45, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'),

-- HAIR EXTENSIONS & WIGS
('Tape-in Extensions', 'Seamless tape-in extension application', 280.00, 120, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800'),
('Clip-in Extensions', 'Temporary clip-in extension styling', 85.00, 60, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800'),
('Sew-in Extensions', 'Professional sew-in weave installation', 350.00, 180, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800'),
('Lace Front Wig Install', 'Professional lace front wig application', 180.00, 90, 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800'),
('Wig Styling', 'Custom wig cutting and styling', 95.00, 60, 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800'),
('Hair Replacement', 'Medical hair replacement consultation', 450.00, 120, 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800'),

-- NAIL SERVICES
('Classic Manicure', 'Traditional manicure with polish application', 45.00, 45, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800'),
('Gel Manicure', 'Long-lasting gel nail polish manicure', 65.00, 60, 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800'),
('French Manicure', 'Classic French tip manicure', 55.00, 50, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800'),
('Acrylic Nails', 'Full set acrylic nail extensions', 85.00, 90, 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800'),
('Dip Powder Nails', 'Durable dip powder nail system', 75.00, 75, 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800'),
('Nail Art', 'Custom nail art and designs', 25.00, 30, 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800'),
('Classic Pedicure', 'Relaxing pedicure with foot massage', 55.00, 60, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Spa Pedicure', 'Luxury spa pedicure with exfoliation', 75.00, 75, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Gel Pedicure', 'Long-lasting gel polish pedicure', 70.00, 70, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Nail Repair', 'Broken or damaged nail repair', 15.00, 15, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800'),

-- FACIAL SERVICES
('Basic Facial', 'Cleansing and moisturizing facial treatment', 85.00, 60, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Anti-Aging Facial', 'Advanced anti-aging facial treatment', 125.00, 75, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Acne Facial', 'Deep cleansing acne treatment facial', 95.00, 60, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Hydrating Facial', 'Intensive moisture restoration facial', 105.00, 70, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Chemical Peel', 'Professional chemical exfoliation treatment', 150.00, 60, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Microdermabrasion', 'Diamond tip skin resurfacing treatment', 135.00, 60, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('LED Light Therapy', 'Therapeutic LED skin treatment', 85.00, 45, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Oxygen Facial', 'Rejuvenating oxygen infusion facial', 145.00, 75, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),

-- SKINCARE TREATMENTS
('Eyebrow Shaping', 'Professional eyebrow waxing and shaping', 35.00, 30, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Eyebrow Tinting', 'Eyebrow color enhancement tinting', 45.00, 30, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Eyelash Extensions', 'Individual eyelash extension application', 125.00, 120, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Lash Lift', 'Natural eyelash curling and tinting', 85.00, 60, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800'),
('Dermaplaning', 'Exfoliating facial hair removal treatment', 115.00, 45, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),

-- WAXING SERVICES
('Full Leg Wax', 'Complete leg hair removal waxing', 85.00, 60, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Half Leg Wax', 'Lower or upper leg waxing service', 55.00, 45, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Brazilian Wax', 'Complete bikini area hair removal', 75.00, 45, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Bikini Wax', 'Basic bikini line hair removal', 45.00, 30, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Underarm Wax', 'Underarm hair removal waxing', 25.00, 15, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Facial Wax', 'Upper lip and chin hair removal', 20.00, 15, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Full Arm Wax', 'Complete arm hair removal', 65.00, 45, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Back Wax', 'Full back hair removal waxing', 75.00, 60, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),
('Chest Wax', 'Chest hair removal waxing', 55.00, 45, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'),

-- MAKEUP SERVICES
('Everyday Makeup', 'Natural everyday makeup application', 65.00, 45, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Special Event Makeup', 'Glamorous makeup for special occasions', 95.00, 60, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Bridal Makeup', 'Wedding day makeup with trial', 150.00, 90, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Prom Makeup', 'Special prom night makeup styling', 85.00, 60, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Photoshoot Makeup', 'Professional photography makeup', 125.00, 75, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Makeup Lesson', 'Personal makeup application tutorial', 95.00, 90, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Airbrush Makeup', 'Flawless airbrush makeup application', 135.00, 75, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),

-- MASSAGE & WELLNESS
('Scalp Massage', 'Relaxing therapeutic scalp massage', 45.00, 30, 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800'),
('Head & Neck Massage', 'Tension relief massage for head and neck', 65.00, 45, 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800'),
('Hand & Arm Massage', 'Moisturizing hand and arm massage', 35.00, 20, 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800'),
('Foot Massage', 'Relaxing foot and ankle massage', 55.00, 30, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),

-- SPECIALTY SERVICES
('Hair Consultation', 'Professional hair styling consultation', 25.00, 30, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'),
('Color Consultation', 'Hair color planning and consultation', 35.00, 30, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'),
('Bridal Trial', 'Wedding hair and makeup trial run', 125.00, 120, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Hair Washing', 'Professional hair wash and conditioning', 25.00, 20, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800'),
('Dry Cut', 'Precision dry cutting technique', 75.00, 45, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'),

-- PACKAGE DEALS
('Full Service Package', 'Complete makeover: cut, color, style, makeup', 350.00, 240, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Bridal Package', 'Complete bridal hair and makeup service', 275.00, 180, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800'),
('Spa Day Package', 'Full day relaxation: facial, massage, nails', 285.00, 300, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'),
('Girls Night Package', 'Group package for special occasions', 195.00, 150, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'),
('Mother-Daughter Package', 'Bonding experience with matching services', 225.00, 180, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800');

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock, is_bestseller, is_featured) VALUES
('Luxury Shampoo', 'Premium moisturizing shampoo for all hair types', 32.00, 'hair-care', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800', 50, TRUE, TRUE),
('Hydrating Conditioner', 'Deep hydration conditioner', 28.00, 'hair-care', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800', 45, TRUE, FALSE),
('Hair Mask Treatment', 'Intensive repair hair mask', 45.00, 'hair-care', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800', 30, FALSE, TRUE),
('Nail Polish Set', 'Premium nail polish collection', 38.00, 'nails', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800', 60, TRUE, FALSE),
('Facial Serum', 'Anti-aging facial serum', 65.00, 'skincare', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 40, TRUE, TRUE),
('Moisturizing Cream', 'Daily moisturizing face cream', 42.00, 'skincare', 'https://images.unsplash.com/photo-1556228852-80a5e2c53b0f?w=800', 55, FALSE, FALSE),
('Hair Styling Gel', 'Strong hold styling gel', 22.00, 'hair-care', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800', 70, FALSE, FALSE),
('Makeup Brush Set', 'Professional makeup brush collection', 85.00, 'makeup', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 25, TRUE, TRUE),
('Lace Front Wig', 'Natural looking lace front wig', 280.00, 'wigs', 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800', 15, TRUE, TRUE),
('Clip-in Extensions', 'Premium clip-in hair extensions', 150.00, 'extensions', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800', 20, TRUE, FALSE),
('Hair Oil Treatment', 'Nourishing hair oil', 35.00, 'hair-care', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800', 50, FALSE, TRUE),
('Cuticle Oil', 'Nourishing cuticle oil', 18.00, 'nails', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800', 80, FALSE, FALSE),
('Face Mask Set', 'Variety pack of face masks', 48.00, 'skincare', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800', 35, TRUE, FALSE),
('Heat Protectant Spray', 'Thermal protection for hair', 26.00, 'hair-care', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800', 60, FALSE, FALSE),
('Synthetic Wig', 'Affordable synthetic wig', 120.00, 'wigs', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800', 18, FALSE, FALSE);
