import { db, contentBlocksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const sections: Record<string, unknown> = {
  site: {
    companyName: "IBEX Exports",
    tagline: "Pakistan's Premier Agricultural Exporter",
    phone: "+92 348 7775210",
    email: "ibexexports.pk@gmail.com",
    location: "Pakistan",
    address: "Lahore, Punjab, Pakistan",
  },
  hero: {
    badgeText: "Trusted Global Trade Partner",
    title: "Delivering Pakistan's",
    titleHighlight: "Finest",
    titleEnd: "to the World",
    subtitle: "Premium Basmati Rice, Pink Himalayan Salt & Agricultural Products — meticulously sourced, strictly certified, and shipped to importers across 40+ countries.",
    cta1Text: "Explore Products",
    cta2Text: "Request a Quote",
  },
  stats: [
    { value: "40+", label: "Countries Exported To" },
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Metric Tons/Year" },
    { value: "100%", label: "Quality Certified" },
  ],
  products: [
    {
      id: "rice",
      title: "Premium Basmati Rice",
      image: "/images/product-rice.png",
      description: "Cultivated in the fertile plains of Punjab, our Basmati rice is known worldwide for its extraordinary length, slender grain, and irresistible aroma.",
      varieties: ["1121 Extra Long Grain (White/Sella/Steam)", "Super Kernel Basmati", "PK-386 Fragrant Rice", "IRRI-6 / IRRI-9 Long Grain"],
      specs: ["Average Grain Length: 8.35mm+", "Moisture: 12% Max", "Broken: 2% Max", "Purity: 95% Min"],
      moq: "1x20' FCL (approx 24-25 MT)",
    },
    {
      id: "salt",
      title: "Pink Himalayan Salt",
      image: "/images/product-salt.png",
      description: "Mined from the ancient Khewra Salt Mine, our 100% natural Pink Himalayan Salt is rich in 84 trace minerals, perfect for culinary and wellness applications.",
      varieties: ["Fine Grade (0.2-0.8mm)", "Coarse Grade (2-5mm)", "Salt Lamps (Natural & Crafted)", "Animal Lick Salt"],
      specs: ["NaCl: 98% Min", "Moisture: 0.1% Max", "Insoluble Matter: 0.2% Max", "Food Grade Certified"],
      moq: "1x20' FCL (approx 24 MT)",
    },
    {
      id: "herbs",
      title: "Organic Herbs & Spices",
      image: "/images/product-herbs.png",
      description: "Sourced directly from local farmers, our spices are processed under strict hygienic conditions to preserve their natural volatile oils and vibrant colors.",
      varieties: ["Red Chilli (Whole/Powder)", "Coriander Seeds", "Cumin Seeds", "Turmeric"],
      specs: ["Aflatoxin Free", "Moisture: 10% Max", "Foreign Matter: 1% Max", "Steam Sterilized (optional)"],
      moq: "5 Metric Tons",
    },
    {
      id: "fruits",
      title: "Dried Fruits & Nuts",
      image: "/images/product-fruits.png",
      description: "Harvested from the high-altitude orchards of Gilgit-Baltistan and Balochistan, offering exceptional taste and nutritional value.",
      varieties: ["Walnuts (In-shell/Kernels)", "Dried Apricots", "Almonds", "Pine Nuts"],
      specs: ["New Crop Only", "Fumigated before shipment", "Sorted and Graded", "Vacuum Packaging Available"],
      moq: "2 Metric Tons",
    },
    {
      id: "cotton",
      title: "Cotton Products",
      image: "/images/product-rice.png",
      description: "High-quality raw cotton and cotton lint from Pakistan's famous cotton belt region.",
      varieties: ["Raw Cotton", "Cotton Lint", "Cotton Yarn"],
      specs: ["Grade A Quality", "Staple Length: 1-3/32\"", "Micronaire: 3.8-4.8", "Uniformity: 82%+"],
      moq: "20 Metric Tons",
    },
  ],
  why_us: [
    { icon: "ShieldCheck", title: "Quality Assurance", description: "Rigorous ISO certified quality control at every stage, from sourcing to packaging." },
    { icon: "Globe2", title: "Export Expertise", description: "Deep understanding of international trade laws, customs, and documentation." },
    { icon: "Ship", title: "Reliable Shipping", description: "Strong partnerships with major shipping lines ensuring timely global delivery." },
    { icon: "BadgeDollarSign", title: "Competitive Pricing", description: "Direct sourcing from farms allows us to offer premium quality at competitive rates." },
  ],
  testimonial: {
    quote: "IBEX Exports has been our most reliable supplier for Basmati Rice in the Middle East. Their commitment to quality and punctuality is unmatched in the industry.",
    authorName: "Ahmed Hassan",
    authorRole: "Director of Procurement, UAE",
  },
  cta_banner: {
    title: "Ready to place an international order?",
    subtitle: "Get in touch with our export specialists for current pricing and shipping estimates.",
    buttonText: "Request a Quote",
  },
  about: {
    story: "IBEX Exports was born out of a simple realization: Pakistan produces some of the world's finest agricultural commodities, yet global buyers often struggle to find a reliable, professional, and transparent export partner.\n\nOver the past 15+ years, we have built an end-to-end supply chain that connects the fertile plains of Punjab and the ancient salt mines of Khewra directly to international ports. We oversee every step—from procurement and processing to quality control and logistics.\n\nToday, IBEX Exports is recognized as a premier export house, trusted by wholesale distributors, supermarket chains, and food manufacturers across Europe, the Middle East, North America, and Asia.",
    mission: "To showcase the exceptional quality of Pakistan's agricultural wealth to the world.",
    vision: "To be the most trusted global trade partner from Pakistan.",
    founded: "2009",
    certifications: ["ISO 9001:2015", "HACCP", "HALAL", "FDA Reg.", "SGS Inspected"],
    timeline: [
      { year: "2009", event: "IBEX Exports founded in Lahore, Pakistan." },
      { year: "2012", event: "First international shipment to UAE and Saudi Arabia." },
      { year: "2015", event: "Achieved ISO 9001:2015 and HACCP certifications." },
      { year: "2018", event: "Expanded product range to 5 major categories." },
      { year: "2021", event: "Reached milestone of exporting to 30+ countries." },
      { year: "2024", event: "Serving 40+ countries with 500+ metric tons annually." },
    ],
    values: [
      { title: "Uncompromising Quality", desc: "We never cut corners on quality. Every shipment is rigorously inspected and certified." },
      { title: "Integrity in Trade", desc: "Transparent pricing, honest communication, and ethical sourcing practices are our foundation." },
      { title: "Sustainable Sourcing", desc: "Working closely with local farmers to promote sustainable agricultural practices in Pakistan." },
      { title: "Client Centricity", desc: "Your success is our success. We adapt to your specific packaging, grading, and shipping needs." },
    ],
  },
  export_info: {
    steps: [
      { stepNumber: "1", title: "Inquiry & Quotation", desc: "Submit your requirements (product, grade, packaging, destination). We provide a competitive CNF/FOB quotation within 24 hours." },
      { stepNumber: "2", title: "Sample Approval", desc: "Upon price agreement, we dispatch representative samples via DHL/FedEx for your physical inspection and approval." },
      { stepNumber: "3", title: "Contract & Payment", desc: "We draft a formal Proforma Invoice. Buyer opens an Irrevocable Letter of Credit (LC) or transfers advance payment." },
      { stepNumber: "4", title: "Processing & QC", desc: "Goods are procured, processed, and packed. Independent third-party inspection (SGS/Bureau Veritas) conducted if required." },
      { stepNumber: "5", title: "Shipment & Docs", desc: "Containers are loaded and shipped. Original shipping documents are couriered to your bank." },
    ],
    documents: ["Commercial Invoice", "Packing List", "Bill of Lading (B/L)", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate", "Quality & Weight Certificate"],
    paymentTerms: ["Irrevocable L/C at sight", "T/T (30% Advance, 70% against copy of B/L)", "D/P (Documents against Payment) for established clients"],
    shippingMethods: ["FCL (Full Container Load) - 20ft & 40ft", "LCL (Less than Container Load)", "Air Freight for urgent/high-value samples"],
  },
  blog: [
    {
      id: "1",
      title: "Pakistan Basmati Rice Export Guide 2025",
      excerpt: "Everything you need to know about pricing trends, crop yield forecasts, and sourcing the best 1121 and Super Kernel varieties this year.",
      date: "Oct 15, 2024",
      author: "Market Research Team",
      image: "/images/product-rice.png",
      category: "Market Insights",
    },
    {
      id: "2",
      title: "The Rising Global Demand for Pink Himalayan Salt",
      excerpt: "Why culinary professionals and wellness brands worldwide are shifting to authentic Khewra mine salt, and how to verify authenticity.",
      date: "Sep 28, 2024",
      author: "Product Specialists",
      image: "/images/product-salt.png",
      category: "Product Focus",
    },
    {
      id: "3",
      title: "How to Import Agricultural Goods from Pakistan",
      excerpt: "A step-by-step guide to documentation, LC requirements, and choosing the right CNF/FOB shipping terms for your B2B orders.",
      date: "Sep 10, 2024",
      author: "Logistics Dept",
      image: "/images/hero-bg.png",
      category: "Trade Guides",
    },
    {
      id: "4",
      title: "Pakistan's Agricultural Export Boom: Opportunities for Global Buyers",
      excerpt: "Pakistan's agricultural export sector is growing rapidly. Discover the key opportunities, emerging markets, and best practices for international procurement.",
      date: "Aug 20, 2024",
      author: "Editorial Team",
      image: "/images/product-herbs.png",
      category: "Market Report",
    },
  ],
  contact: {
    phone: "+92 348 7775210",
    email: "ibexexports.pk@gmail.com",
    address: "IBEX Exports HQ\nLahore, Punjab\nPakistan",
    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM (PKT)",
    whatsapp: "+92 348 7775210",
  },
};

async function seed() {
  console.log("Seeding content blocks...");
  for (const [section, data] of Object.entries(sections)) {
    const value = JSON.stringify(data);
    const [existing] = await db
      .select()
      .from(contentBlocksTable)
      .where(eq(contentBlocksTable.section, section));

    if (existing) {
      console.log(`  Updating section: ${section}`);
      await db
        .update(contentBlocksTable)
        .set({ value })
        .where(eq(contentBlocksTable.section, section));
    } else {
      console.log(`  Inserting section: ${section}`);
      await db.insert(contentBlocksTable).values({ section, value });
    }
  }
  console.log("Done seeding content blocks.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
