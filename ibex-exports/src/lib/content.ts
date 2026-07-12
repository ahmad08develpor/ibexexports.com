export interface SiteContent {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  address: string;
}

export interface HeroContent {
  badgeText: string;
  title: string;
  titleHighlight: string;
  titleEnd: string;
  subtitle: string;
  cta1Text: string;
  cta2Text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  images: string[];
  video: string;
  description: string;
  varieties: string[];
  specs: string[];
  moq: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialContent {
  quote: string;
  authorName: string;
  authorRole: string;
}

export interface CtaBannerContent {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface AboutContent {
  story: string;
  mission: string;
  vision: string;
  founded: string;
  certifications: string[];
  timeline: { year: string; event: string }[];
  values: { title: string; desc: string }[];
}

export interface ExportInfoContent {
  steps: { stepNumber: string; title: string; desc: string }[];
  documents: string[];
  paymentTerms: string[];
  shippingMethods: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  whatsapp: string;
}

export const defaultSiteContent: SiteContent = {
  companyName: "IBEX Exports",
  tagline: "Trusted Global Trade Partner",
  phone: "+92 348 7775210",
  email: "ibexexports.pk@gmail.com",
  location: "Pakistan",
  address: "Shahrah-e-Faisal, Karachi, Pakistan",
};

export const defaultHeroContent: HeroContent = {
  badgeText: "Trusted Global Trade Partner",
  title: "Delivering Pakistan's",
  titleHighlight: "Finest",
  titleEnd: "to the World",
  subtitle: "Premium Basmati Rice, Pink Himalayan Salt & Agricultural Products — meticulously sourced, strictly certified, and shipped to importers across 40+ countries.",
  cta1Text: "Explore Products",
  cta2Text: "Request a Quote",
};

export const defaultStats: StatItem[] = [
  { value: "40+", label: "Countries Exported To" },
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Metric Tons/Year" },
  { value: "100%", label: "Quality Certified" },
];

export const defaultProducts: ProductItem[] = [
  {
    id: "rice",
    title: "Premium Basmati Rice",
    image: "/images/product-rice.png",
    images: [],
    video: "",
    description: "Cultivated in the fertile plains of Punjab, our Basmati rice is known worldwide for its extraordinary length, slender grain, and irresistible aroma.",
    varieties: ["1121 Extra Long Grain (White/Sella/Steam)", "Super Kernel Basmati", "PK-386 Fragrant Rice", "IRRI-6 / IRRI-9 Long Grain"],
    specs: [
      "Average Grain Length: 8.35mm+",
      "Moisture: 12% Max",
      "Broken: 2% Max",
      "Purity: 95% Min"
    ],
    moq: "1x20' FCL (approx 24-25 MT)"
  },
  {
    id: "salt",
    title: "Pink Himalayan Salt",
    image: "/images/product-salt.png",
    images: [],
    video: "",
    description: "Mined from the ancient Khewra Salt Mine, our 100% natural Pink Himalayan Salt is rich in 84 trace minerals, perfect for culinary and wellness applications.",
    varieties: ["Fine Grade (0.2-0.8mm)", "Coarse Grade (2-5mm)", "Salt Lamps (Natural & Crafted)", "Animal Lick Salt"],
    specs: [
      "NaCl: 98% Min",
      "Moisture: 0.1% Max",
      "Insoluble Matter: 0.2% Max",
      "Food Grade Certified"
    ],
    moq: "1x20' FCL (approx 24 MT)"
  },
  {
    id: "herbs",
    title: "Organic Herbs & Spices",
    image: "/images/product-herbs.png",
    images: [],
    video: "",
    description: "Sourced directly from local farmers, our spices are processed under strict hygienic conditions to preserve their natural volatile oils and vibrant colors.",
    varieties: ["Red Chilli (Whole/Powder)", "Coriander Seeds", "Cumin Seeds", "Turmeric"],
    specs: [
      "Aflatoxin Free",
      "Moisture: 10% Max",
      "Foreign Matter: 1% Max",
      "Steam Sterilized (optional)"
    ],
    moq: "5 Metric Tons"
  },
  {
    id: "fruits",
    title: "Dried Fruits & Nuts",
    image: "/images/product-fruits.png",
    images: [],
    video: "",
    description: "Harvested from the high-altitude orchards of Gilgit-Baltistan and Balochistan, offering exceptional taste and nutritional value.",
    varieties: ["Walnuts (In-shell/Kernels)", "Dried Apricots", "Almonds", "Pine Nuts"],
    specs: [
      "New Crop Only",
      "Fumigated before shipment",
      "Sorted and Graded",
      "Vacuum Packaging Available"
    ],
    moq: "2 Metric Tons"
  }
];

export const defaultWhyUs: WhyUsItem[] = [
  { icon: "ShieldCheck", title: "Quality Assurance", description: "Rigorous ISO certified quality control at every stage, from sourcing to packaging." },
  { icon: "Globe2", title: "Export Expertise", description: "Deep understanding of international trade laws, customs, and documentation." },
  { icon: "Ship", title: "Reliable Shipping", description: "Strong partnerships with major shipping lines ensuring timely global delivery." },
  { icon: "BadgeDollarSign", title: "Competitive Pricing", description: "Direct sourcing from farms allows us to offer premium quality at competitive rates." },
];

export const defaultTestimonial: TestimonialContent = {
  quote: "IBEX Exports has been our most reliable supplier for Basmati Rice in the Middle East. Their commitment to quality and punctuality is unmatched in the industry.",
  authorName: "Ahmed Hassan",
  authorRole: "Director of Procurement, UAE",
};

export const defaultCtaBanner: CtaBannerContent = {
  title: "Ready to place an international order?",
  subtitle: "Get in touch with our export specialists for current pricing and shipping estimates.",
  buttonText: "Request a Quote",
};

export const defaultAbout: AboutContent = {
  story: "IBEX Exports was born out of a simple realization: Pakistan produces some of the world's finest agricultural commodities, yet global buyers often struggle to find a reliable, professional, and transparent export partner.\n\nOver the past 15+ years, we have built an end-to-end supply chain that connects the fertile plains of Punjab and the ancient salt mines of Khewra directly to international ports. We oversee every step—from procurement and processing to quality control and logistics.\n\nToday, IBEX Exports is recognized as a premier export house, trusted by wholesale distributors, supermarket chains, and food manufacturers across Europe, the Middle East, North America, and Asia.",
  mission: "To showcase the exceptional quality of Pakistan's agricultural wealth to the world.",
  vision: "To be the most trusted global trade partner from Pakistan.",
  founded: "2008",
  certifications: ["ISO 9001:2015", "HACCP", "HALAL", "FDA Reg."],
  timeline: [
    { year: "2008", event: "Founded in Karachi as a small domestic trading firm." },
    { year: "2012", event: "Began international operations, exporting first container of Basmati Rice to UAE." },
    { year: "2016", event: "Acquired ISO 9001 and HACCP certifications for processing facilities." },
    { year: "2019", event: "Expanded product line to include Pink Himalayan Salt and Dried Fruits." },
    { year: "2024", event: "Reached milestone of exporting to 40+ countries across 5 continents." },
  ],
  values: [
    { title: "Uncompromising Quality", desc: "We never cut corners on quality. Every shipment is rigorously inspected and certified." },
    { title: "Integrity in Trade", desc: "Transparent pricing, honest communication, and ethical sourcing practices are our foundation." },
    { title: "Sustainable Sourcing", desc: "Working closely with local farmers to promote sustainable agricultural practices in Pakistan." },
    { title: "Client Centricity", desc: "Your success is our success. We adapt to your specific packaging, grading, and shipping needs." },
  ],
};

export const defaultExportInfo: ExportInfoContent = {
  steps: [
    { stepNumber: "1", title: "Inquiry & Quotation", desc: "Submit your requirements (product, grade, packaging, destination). We provide a competitive CNF/FOB quotation within 24 hours." },
    { stepNumber: "2", title: "Sample Approval", desc: "Upon price agreement, we dispatch representative samples via DHL/FedEx for your physical inspection and approval." },
    { stepNumber: "3", title: "Contract & LC", desc: "We draft a formal Proforma Invoice. Buyer opens an Irrevocable Letter of Credit (LC) or transfers advance payment." },
    { stepNumber: "4", title: "Processing & QC", desc: "Goods are procured, processed, and packed. Independent third-party inspection (SGS/Bureau Veritas) is conducted if required." },
    { stepNumber: "5", title: "Shipment & Docs", desc: "Containers are loaded and shipped. Original shipping documents are couriered to your bank." },
  ],
  documents: ["Commercial Invoice", "Packing List", "Bill of Lading (B/L)", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate", "Quality & Weight Certificate"],
  paymentTerms: ["Irrevocable L/C at sight", "T/T (30% Advance, 70% against copy of B/L)", "D/P (Documents against Payment) for established clients"],
  shippingMethods: ["FCL (Full Container Load) - 20ft & 40ft", "LCL (Less than Container Load)", "Air Freight for urgent/high-value samples"],
};

export const defaultBlog: BlogPost[] = [
  {
    id: "1",
    title: "Pakistan Basmati Rice Export Guide 2025",
    excerpt: "Everything you need to know about pricing trends, crop yield forecasts, and sourcing the best 1121 and Super Kernel varieties this year.",
    date: "Oct 15, 2024",
    author: "Market Research Team",
    image: "/images/product-rice.png",
    category: "Market Insights"
  },
  {
    id: "2",
    title: "The Rising Global Demand for Pink Himalayan Salt",
    excerpt: "Why culinary professionals and wellness brands worldwide are shifting to authentic Khewra mine salt, and how to verify authenticity.",
    date: "Sep 28, 2024",
    author: "Product Specialists",
    image: "/images/product-salt.png",
    category: "Product Focus"
  },
  {
    id: "3",
    title: "How to Import Agricultural Goods from Pakistan",
    excerpt: "A step-by-step guide to documentation, LC requirements, and choosing the right CNF/FOB shipping terms for your B2B orders.",
    date: "Sep 10, 2024",
    author: "Logistics Dept",
    image: "/images/hero-bg.png",
    category: "Trade Guides"
  }
];

export const defaultContact: ContactContent = {
  phone: "+92 348 7775210",
  email: "ibexexports.pk@gmail.com",
  address: "IBEX Exports HQ\nShahrah-e-Faisal, Karachi\nPakistan",
  businessHours: "Mon - Sat: 9:00 AM - 6:00 PM (PKT)",
  whatsapp: "+92 348 7775210",
};
