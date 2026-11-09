import { Product } from "./types";

export const PRODUCT_CATALOG: Product[] = [
  {
    id: "prod-kyy-4k-156",
    title: "KYY 15.6'' 4K UHD OLED Portable Monitor",
    brand: "KYY Ultra",
    category: "monitors",
    description: "Ultra-slim 3840x2160 4K UHD portable monitor with 100% DCI-P3 color gamut, dual USB Type-C & Mini HDMI ports, magnetic smart cover, and built-in dual speakers.",
    price: 139.99,
    originalPrice: 189.99,
    discountCode: "AGENTDEAL25",
    discountPercentage: 26,
    rating: 4.8,
    reviewsCount: 1420,
    specs: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Panel Type": "IPS / OLED Grade",
      "Screen Size": "15.6 Inches",
      "Refresh Rate": "60Hz",
      "Connectivity": "Dual USB-C, Mini-HDMI, 3.5mm Audio",
      "Weight": "1.7 lbs (0.77 kg)",
      "Brightness": "400 nits",
      "Color Gamut": "100% sRGB / 99% DCI-P3"
    },
    seller: {
      name: "Apex Electronics Direct",
      verified: true,
      trustScore: 98,
      location: "San Jose, CA, USA"
    },
    shippingCost: 0,
    shippingDays: "2-3 business days",
    returnDays: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    highlight: "🎯 Perfect Match: 4K UHD under $150 with negotiated bundle discount!"
  },
  {
    id: "prod-arzopa-2k-160",
    title: "ARZOPA 16.1'' 144Hz 2K Portable Gaming Monitor",
    brand: "ARZOPA",
    category: "monitors",
    description: "High-refresh rate 2560x1440 144Hz gaming portable monitor, FreeSync support, matte anti-glare screen for developers and gamers.",
    price: 129.99,
    originalPrice: 159.99,
    discountCode: "GAMER10",
    discountPercentage: 18,
    rating: 4.6,
    reviewsCount: 980,
    specs: {
      "Resolution": "2560 x 1440 (2K QHD)",
      "Panel Type": "IPS Anti-glare",
      "Screen Size": "16.1 Inches",
      "Refresh Rate": "144Hz",
      "Connectivity": "USB-C, Mini-HDMI",
      "Weight": "1.85 lbs",
      "Brightness": "350 nits"
    },
    seller: {
      name: "PixelCraft Tech",
      verified: true,
      trustScore: 94,
      location: "Austin, TX, USA"
    },
    shippingCost: 0,
    shippingDays: "3-5 business days",
    returnDays: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1547119957-637f8679db17?auto=format&fit=crop&w=800&q=80",
    highlight: "Alternative: Higher refresh rate (144Hz) but 2K resolution."
  },
  {
    id: "prod-asus-zen-4k",
    title: "ASUS ZenScreen 15.6'' 4K Portable Display (Premium)",
    brand: "ASUS",
    category: "monitors",
    description: "Flagship 4K HDR portable monitor with auto-rotation sensor, tripod mount socket, and smart pen cover.",
    price: 289.99,
    originalPrice: 329.99,
    rating: 4.7,
    reviewsCount: 2310,
    specs: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Panel Type": "IPS Premium",
      "Screen Size": "15.6 Inches",
      "Refresh Rate": "60Hz",
      "Connectivity": "USB-C DisplayPort, Micro HDMI",
      "Weight": "1.65 lbs",
      "Brightness": "450 nits"
    },
    seller: {
      name: "Official ASUS Authorized",
      verified: true,
      trustScore: 99,
      location: "Fremont, CA, USA"
    },
    shippingCost: 9.99,
    shippingDays: "2 business days",
    returnDays: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=800&q=80",
    highlight: "Over Budget: Premium enterprise grade, exceeds target budget."
  },
  {
    id: "prod-keychron-q1",
    title: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    brand: "Keychron",
    category: "keyboards",
    description: "Full aluminum QMK/VIA custom mechanical keyboard with hot-swappable tactile switches, double-gasket design, and Mac/Windows switch.",
    price: 119.99,
    originalPrice: 149.99,
    discountCode: "DEVKEY20",
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 3120,
    specs: {
      "Layout": "75% Compact",
      "Connectivity": "Bluetooth 5.1 / Type-C Wired",
      "Battery": "4000mAh (Up to 300 hrs)",
      "Case": "CNC Anodized Aluminum",
      "Switches": "K Pro Banana Tactile (Pre-lubed)"
    },
    seller: {
      name: "Keychron Direct",
      verified: true,
      trustScore: 99,
      location: "San Francisco, CA, USA"
    },
    shippingCost: 0,
    shippingDays: "2-4 business days",
    returnDays: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    highlight: "Top Ergonomic Pick: Pre-lubed custom switches with negotiated coupon."
  },
  {
    id: "prod-sony-wh1000xm5",
    title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    brand: "Sony",
    category: "audio",
    description: "Industry leading active noise cancellation with 8 microphones, Auto NC Optimizer, 30-hour battery life, and crystal clear hands-free calling.",
    price: 278.00,
    originalPrice: 399.99,
    discountCode: "SONYPRO30",
    discountPercentage: 30,
    rating: 4.8,
    reviewsCount: 8940,
    specs: {
      "Driver": "30mm Precision Driver",
      "Battery Life": "30 Hours with ANC on",
      "Codecs": "LDAC, AAC, SBC",
      "Weight": "250g",
      "Features": "Multipoint connection, Speak-to-chat"
    },
    seller: {
      name: "AudioWorld Official",
      verified: true,
      trustScore: 97,
      location: "Seattle, WA, USA"
    },
    shippingCost: 0,
    shippingDays: "1-2 business days",
    returnDays: 30,
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    highlight: "Massive Discount: $121 off original price with verified authenticity guarantee."
  },
  {
    id: "prod-anker-dock-station",
    title: "Anker 575 USB-C Triple Display 13-in-1 Docking Station",
    brand: "Anker",
    category: "accessories",
    description: "85W laptop charging, 4K triple display support via HDMI and DisplayPort, Gigabit Ethernet, SD card slots, and dual 10Gbps USB-C ports.",
    price: 99.99,
    originalPrice: 139.99,
    discountCode: "DOCKDEAL25",
    discountPercentage: 28,
    rating: 4.7,
    reviewsCount: 2150,
    specs: {
      "Power Delivery": "85W Output",
      "Display Outputs": "2x HDMI, 1x DisplayPort (Triple 4K)",
      "Ports": "13 Total Expansion Ports",
      "Compatibility": "Thunderbolt 4/3, USB-C Windows & macOS"
    },
    seller: {
      name: "Anker Direct Store",
      verified: true,
      trustScore: 99,
      location: "Ontario, CA, USA"
    },
    shippingCost: 0,
    shippingDays: "2-3 business days",
    returnDays: 45,
    inStock: true,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
    highlight: "Complete Setup Companion: Powers 3 monitors and charges your machine."
  }
];

