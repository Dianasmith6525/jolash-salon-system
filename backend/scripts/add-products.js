const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.PGPASSWORD,
    port: process.env.DB_PORT,
});

const products = [
    // New Luxury Bundles
    {
        name: "Malaysian Curly Bundle Deal",
        description: "3 bundles of premium Malaysian curly hair. Natural curl pattern, minimal shedding. Can be straightened and styled. Lengths: 18\", 20\", 22\".",
        price: 449.99,
        image_url: "/products/malaysian-curly.jpg",
        category: "Extensions",
        images: ["/products/malaysian-curly.jpg", "/products/malaysian-curly-2.jpg", "/products/malaysian-curly-3.jpg", "/products/malaysian-curly-4.jpg"],
        in_stock: true
    },
    {
        name: "Indian Deep Wave Collection",
        description: "Premium Indian deep wave hair. Rich, bouncy texture that holds pattern after washing. Available in 3 bundle deals.",
        price: 399.99,
        image_url: "/products/indian-deep-wave.jpg",
        category: "Extensions",
        images: ["/products/indian-deep-wave.jpg", "/products/indian-deep-wave-2.jpg", "/products/indian-deep-wave-3.jpg"],
        in_stock: true
    },
    // Professional Styling Tools
    {
        name: "Digital Rotating Curling Iron",
        description: "Auto-rotating barrel for perfect curls every time. LCD display, multiple heat settings, and automatic shut-off.",
        price: 129.99,
        image_url: "/products/rotating-curler.jpg",
        category: "Tools",
        images: ["/products/rotating-curler.jpg", "/products/rotating-curler-2.jpg", "/products/rotating-curler-3.jpg"],
        in_stock: true
    },
    {
        name: "Pro Cordless Trimmer",
        description: "Professional cordless trimmer for precise edge-ups. 4-hour battery life, multiple guide combs included.",
        price: 79.99,
        image_url: "/products/cordless-trimmer.jpg",
        category: "Tools",
        images: ["/products/cordless-trimmer.jpg", "/products/cordless-trimmer-2.jpg"],
        in_stock: true
    },
    // Luxury Hair Care
    {
        name: "Gold Series Hair Mask",
        description: "24K gold-infused deep conditioning mask. Repairs damaged hair, adds shine and softness. Professional salon formula.",
        price: 45.99,
        image_url: "/products/gold-mask.jpg",
        category: "Hair Care",
        images: ["/products/gold-mask.jpg", "/products/gold-mask-2.jpg"],
        in_stock: true
    },
    {
        name: "Silk Press Kit",
        description: "Complete kit for achieving the perfect silk press. Includes heat protectant, shine serum, and holding spray.",
        price: 89.99,
        image_url: "/products/silk-press-kit.jpg",
        category: "Hair Care",
        images: ["/products/silk-press-kit.jpg", "/products/silk-press-kit-2.jpg", "/products/silk-press-kit-3.jpg"],
        in_stock: true
    },
    // Premium Wigs
    {
        name: "613 Blonde Full Lace Wig",
        description: "Platinum blonde full lace wig. Pre-plucked, pre-bleached knots. Virgin hair, can be toned to desired shade.",
        price: 599.99,
        image_url: "/products/blonde-wig.jpg",
        category: "Wigs",
        images: ["/products/blonde-wig.jpg", "/products/blonde-wig-2.jpg", "/products/blonde-wig-3.jpg", "/products/blonde-wig-4.jpg"],
        in_stock: true
    },
    {
        name: "Glueless HD Lace Wig",
        description: "Invisible HD lace, pre-plucked hairline. Glueless design with adjustable straps and combs. Natural density.",
        price: 449.99,
        image_url: "/products/hd-lace-wig.jpg",
        category: "Wigs",
        images: ["/products/hd-lace-wig.jpg", "/products/hd-lace-wig-2.jpg", "/products/hd-lace-wig-3.jpg"],
        in_stock: true
    },
    // Styling Products
    {
        name: "Edge Control Pro Kit",
        description: "Maximum hold edge control with special brush set. Water-resistant formula, perfect for laying edges.",
        price: 34.99,
        image_url: "/products/edge-kit.jpg",
        category: "Styling",
        images: ["/products/edge-kit.jpg", "/products/edge-kit-2.jpg"],
        in_stock: true
    },
    {
        name: "Thermal Protection Set",
        description: "Complete heat protection system. Includes spray, serum, and cream for maximum heat protection up to 450°F.",
        price: 59.99,
        image_url: "/products/heat-protection.jpg",
        category: "Hair Care",
        images: ["/products/heat-protection.jpg", "/products/heat-protection-2.jpg"],
        in_stock: true
    },
    // Hair Extensions
    {
        name: "Premium Brazilian Body Wave Bundle",
        description: "100% virgin Brazilian human hair, body wave texture. Available in 16-24 inches. Can be dyed, straightened, and curled. Perfect for a natural, flowing look.",
        price: 299.99,
        image_url: "/products/brazilian-body-wave.jpg",
        category: "Extensions",
        images: ["/products/brazilian-body-wave.jpg", "/products/brazilian-body-wave-2.jpg", "/products/brazilian-body-wave-3.jpg"],
        in_stock: true
    },
    {
        name: "Luxury Straight Peruvian Bundle",
        description: "Premium straight Peruvian hair bundle, 18-26 inches. Silky smooth texture, minimal shedding, and long-lasting durability.",
        price: 279.99,
        image_url: "/products/peruvian-straight.jpg",
        category: "Extensions",
        images: ["/products/peruvian-straight.jpg", "/products/peruvian-straight-2.jpg", "/products/peruvian-straight-3.jpg"],
        in_stock: true
    },
    // Hair Care Products
    {
        name: "Moisture Rich Shampoo",
        description: "Sulfate-free moisturizing shampoo enriched with argan oil and keratin. Perfect for all hair types, especially treated hair.",
        price: 24.99,
        image_url: "/products/moisture-shampoo.jpg",
        category: "Hair Care",
        images: ["/products/moisture-shampoo.jpg", "/products/moisture-shampoo-2.jpg"],
        in_stock: true
    },
    {
        name: "Deep Conditioning Mask",
        description: "Intensive repair mask with coconut oil, shea butter, and biotin. Restores damaged hair and adds shine.",
        price: 34.99,
        image_url: "/products/conditioning-mask.jpg",
        category: "Hair Care",
        images: ["/products/conditioning-mask.jpg", "/products/conditioning-mask-2.jpg"],
        in_stock: true
    },
    {
        name: "Leave-in Treatment Spray",
        description: "Lightweight leave-in conditioner with heat protection. Detangles and prevents split ends.",
        price: 19.99,
        image_url: "/products/leave-in-spray.jpg",
        category: "Hair Care",
        images: ["/products/leave-in-spray.jpg", "/products/leave-in-spray-2.jpg"],
        in_stock: true
    },
    // Styling Tools
    {
        name: "Pro Series Ceramic Flat Iron",
        description: "Professional ceramic flat iron with digital temperature control. Floating plates for smooth straightening.",
        price: 149.99,
        image_url: "/products/ceramic-iron.jpg",
        category: "Tools",
        images: ["/products/ceramic-iron.jpg", "/products/ceramic-iron-2.jpg", "/products/ceramic-iron-3.jpg"],
        in_stock: true
    },
    {
        name: "Ionic Hair Dryer",
        description: "1875W professional ionic hair dryer. Multiple heat and speed settings, with cool shot button.",
        price: 89.99,
        image_url: "/products/hair-dryer.jpg",
        category: "Tools",
        images: ["/products/hair-dryer.jpg", "/products/hair-dryer-2.jpg"],
        in_stock: true
    },
    // Wigs
    {
        name: "Full Lace Human Hair Wig",
        description: "360° full lace wig, 100% human hair. Pre-plucked with baby hairs. Natural hairline and comfortable fit.",
        price: 399.99,
        image_url: "/products/full-lace-wig.jpg",
        category: "Wigs",
        images: ["/products/full-lace-wig.jpg", "/products/full-lace-wig-2.jpg", "/products/full-lace-wig-3.jpg"],
        in_stock: true
    },
    {
        name: "Synthetic Lace Front Wig",
        description: "Heat-resistant synthetic lace front wig. Natural look with pre-plucked hairline. Multiple styles available.",
        price: 159.99,
        image_url: "/products/synthetic-wig.jpg",
        category: "Wigs",
        images: ["/products/synthetic-wig.jpg", "/products/synthetic-wig-2.jpg"],
        in_stock: true
    },
    // Hair Accessories
    {
        name: "Professional Edge Control Kit",
        description: "Complete edge control kit with brush, gel, and styling tools. Perfect for sleek edges and baby hairs.",
        price: 29.99,
        image_url: "/products/edge-control.jpg",
        category: "Accessories",
        images: ["/products/edge-control.jpg", "/products/edge-control-2.jpg"],
        in_stock: true
    },
    {
        name: "Silk Hair Wrap Set",
        description: "100% mulberry silk hair wrap and pillowcase. Prevents frizz and maintains hairstyles overnight.",
        price: 49.99,
        image_url: "/products/silk-wrap.jpg",
        category: "Accessories",
        images: ["/products/silk-wrap.jpg", "/products/silk-wrap-2.jpg"],
        in_stock: true
    },
    // Extension Care
    {
        name: "Extension Care Kit",
        description: "Complete care kit for hair extensions. Includes special brush, shampoo, conditioner, and storage bag.",
        price: 79.99,
        image_url: "/products/extension-kit.jpg",
        category: "Hair Care",
        images: ["/products/extension-kit.jpg", "/products/extension-kit-2.jpg", "/products/extension-kit-3.jpg"],
        in_stock: true
    },
    {
        name: "Protein Treatment",
        description: "Strengthening protein treatment for natural and extended hair. Prevents breakage and adds shine.",
        price: 39.99,
        image_url: "/products/protein-treatment.jpg",
        category: "Hair Care",
        images: ["/products/protein-treatment.jpg", "/products/protein-treatment-2.jpg"],
        in_stock: true
    }
];

async function addProducts() {
    for (const product of products) {
        try {
            await pool.query(
                'INSERT INTO products (name, description, price, image_url, category, in_stock) VALUES ($1, $2, $3, $4, $5, $6)',
                [product.name, product.description, product.price, product.image_url, product.category, product.in_stock]
            );
            console.log(`Added product: ${product.name}`);
        } catch (err) {
            console.error(`Error adding product ${product.name}:`, err);
        }
    }
}

addProducts()
    .then(() => console.log('All products added successfully'))
    .catch(err => console.error('Error in main execution:', err))
    .finally(() => pool.end());