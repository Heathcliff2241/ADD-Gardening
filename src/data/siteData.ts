// ADD Gardening & Maintenance Services Data & Content
// Generated strictly according to specification

export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  ctaText: string;
  imageAltText: string;
  imageKey: string;
  iconType: 'mower' | 'shears' | 'tidy' | 'flower' | 'fence' | 'pressure' | 'pond' | 'flatpack';
  badgeLabel: string;
  highlights: string[];
  faq: { question: string; answer: string }[];
}

export const BUSINESS_INFO = {
  name: "ADD Gardening & Maintenance Services",
  shortName: "ADD Gardening",
  tagline: "We care for your garden and home so you can enjoy it.",
  handwrittenTagline: "We care for your garden and home so you can enjoy it.",
  summary: "Mobile garden and home maintenance team based in Oulton Broad, Lowestoft, covering lawn care, hedges, ponds, fences, pressure washing, and flat-pack assembly across the Waveney and Great Yarmouth area.",
  primaryPhone: "07538 482844",
  secondaryPhone: "07498 049003",
  email: "addgardens1@gmail.com",
  facebook: "ADD Gardening and Maintenance Services",
  rate: "£21.50 per hour",
  rateNumeric: 21.50,
  rateSubtext: "No hidden costs, just honest pricing",
  baseTown: "Oulton Broad, Lowestoft",
  locationDescription: "Mobile service based in Oulton Broad, Lowestoft, Suffolk — no public premises address, service-area business",
  badges: [
    "Fully Insured",
    "DBS Checked",
    "£21.50 / hour Flat Rate",
    "No Hidden Costs",
    "Year-Round Care"
  ],
  coveredTowns: [
    "Lowestoft",
    "Oulton Broad",
    "Pakefield",
    "Hopton",
    "Corton",
    "Bungay",
    "Poringland",
    "Loddon",
    "Beccles",
    "Great Yarmouth",
    "Oulton",
    "Hempnall",
    "Long Stratton",
    "Harleston",
    "Gorleston"
  ]
};

export const SERVICES: ServiceData[] = [
  {
    slug: "lawn-care",
    name: "Lawn Care & Grass Cutting",
    shortName: "Lawn Care",
    url: "/services/lawn-care",
    metaTitle: "Grass Cutting & Lawn Care in Lowestoft | ADD Gardening",
    metaDescription: "Regular grass cutting, mowing, mulching and edge strimming across Lowestoft and Waveney. £21.50/hour, fully insured. Book with ADD Gardening today.",
    headline: "Grass Cutting & Lawn Care in Lowestoft",
    subheadline: "Keep your lawn neat and healthy, all year round",
    bodyCopy: "Regular mowing, mulching, and edge strimming to keep your lawn looking sharp and staying healthy through every season, not just the summer rush.",
    ctaText: "Book Lawn Care",
    imageAltText: "Freshly mown striped lawn maintained by ADD Gardening in Lowestoft",
    imageKey: "lawn_care",
    iconType: "mower",
    badgeLabel: "Year-Round Service",
    highlights: [
      "Precision stripe mowing & edge strimming",
      "Regular weekly or fortnightly visits",
      "Mulching and clean cuttings collection",
      "One-off recovery cuts for overgrown grass"
    ],
    faq: [
      {
        question: "How often should my lawn be cut?",
        answer: "Most lawns do best with a cut every one to two weeks during the growing season, tapering to less often over autumn and winter. We can set up a regular schedule or come as a one-off."
      }
    ]
  },
  {
    slug: "hedge-trimming",
    name: "Hedge Trimming & Pruning",
    shortName: "Hedge Trimming",
    url: "/services/hedge-trimming",
    metaTitle: "Hedge Trimming & Pruning in Lowestoft | ADD Gardening",
    metaDescription: "Smart, tidy hedges all year round. Loppers to long-reach trimmers, we handle hedges of any height across Lowestoft and Waveney. Fully insured.",
    headline: "Hedge Trimming & Pruning in Lowestoft",
    subheadline: "Smart, tidy hedges all year round",
    bodyCopy: "From loppers to long-reach hedge trimmers, we have the equipment to shape hedges of any height, plus general tree and bush pruning to keep growth under control.",
    ctaText: "Book Hedge Trimming",
    imageAltText: "Neatly trimmed hedge along a garden path, maintained by ADD Gardening",
    imageKey: "hedge_trimming",
    iconType: "shears",
    badgeLabel: "Any Height",
    highlights: [
      "Long-reach pole trimmers for tall boundary hedges",
      "Box, conifer, beech, laurel, and mixed hedges",
      "Bush and ornamental shrub shaping",
      "Full clean-up and clippings removal included"
    ],
    faq: [
      {
        question: "Can you cut tall hedges?",
        answer: "Yes, we carry long-reach hedge trimmers alongside standard tools, so height isn't a limit. We also handle general pruning of trees and bushes as part of the same visit."
      }
    ]
  },
  {
    slug: "garden-maintenance",
    name: "Garden Tidying & General Maintenance",
    shortName: "Garden Tidying",
    url: "/services/garden-maintenance",
    metaTitle: "Garden Tidying & Maintenance in Lowestoft | ADD Gardening",
    metaDescription: "Seasonal garden tidying and general maintenance across Lowestoft and Waveney, tailored to the time of year. £21.50/hour, fully insured team.",
    headline: "Garden Tidying & Maintenance in Lowestoft",
    subheadline: "Keeping your garden neat and in perfect order",
    bodyCopy: "General tidying, weeding, and seasonal maintenance tailored to the time of year, so your garden stays cared for whether it's spring growth or autumn clear-up.",
    ctaText: "Book Garden Maintenance",
    imageAltText: "Tidy garden bed maintained through seasonal upkeep by ADD Gardening",
    imageKey: "garden_tidying",
    iconType: "tidy",
    badgeLabel: "Seasonal Care",
    highlights: [
      "Beds and borders weeding and edging",
      "Autumn leaf clearance and composting",
      "Deadheading perennials and shrub care",
      "Green waste bagging and disposal prep"
    ],
    faq: [
      {
        question: "Do you do one-off garden clearances?",
        answer: "Yes, we frequently carry out one-off overhaul tidy-ups for overgrown gardens, tenant handovers, or pre-sale garden prep at the standard £21.50/hour rate."
      }
    ]
  },
  {
    slug: "planting",
    name: "Planting & Flower/Veg Beds",
    shortName: "Planting & Beds",
    url: "/services/planting",
    metaTitle: "Planting & Flower Bed Services in Lowestoft | ADD Gardening",
    metaDescription: "Establishing and planting flower beds, raised beds and vegetable beds across Lowestoft and Waveney. Fully insured, £21.50/hour.",
    headline: "Planting & Flower Bed Services in Lowestoft",
    subheadline: "Beds that thrive, not just look good on day one",
    bodyCopy: "We establish and plant up flower beds, raised beds, and vegetable beds, choosing and positioning plants so they thrive well beyond the first season.",
    ctaText: "Book Planting",
    imageAltText: "Colorful flower bed planted and maintained by ADD Gardening in Lowestoft",
    imageKey: "flower_planting",
    iconType: "flower",
    badgeLabel: "Flower & Veg",
    highlights: [
      "Raised bed preparation and planting",
      "Seasonal bedding plant displays",
      "Perennial border design & planting",
      "Soil enrichment, compost blending & mulching"
    ],
    faq: [
      {
        question: "Can you help advise what plants suit my garden soil?",
        answer: "Yes, we take into account sunlight, soil drainage, and coastal winds common in Lowestoft and Waveney to suggest plants that truly thrive."
      }
    ]
  },
  {
    slug: "fence-painting",
    name: "Fence Painting",
    shortName: "Fence Painting",
    url: "/services/fence-painting",
    metaTitle: "Fence Painting in Lowestoft | ADD Gardening & Maintenance",
    metaDescription: "Fence painting and treatment across Lowestoft and Waveney to extend the life of your fencing. £21.50/hour, fully insured team.",
    headline: "Fence Painting in Lowestoft",
    subheadline: "Extend the life of your fence, without the hassle",
    bodyCopy: "Painting fences can be a mundane, laborious task, so let us do it for you. As the backdrop to your garden, a freshly treated fence extends its lifespan and lifts the whole space.",
    ctaText: "Book Fence Painting",
    imageAltText: "Freshly painted wooden fence, treated by ADD Gardening in Lowestoft",
    imageKey: "fence_painting",
    iconType: "fence",
    badgeLabel: "Weather Protection",
    highlights: [
      "Protective wood stain & preservative application",
      "Thorough surface brushing and prep beforehand",
      "Gates, trellis panels, and shed painting",
      "Clean lines with plant protection during work"
    ],
    faq: [
      {
        question: "Do you supply the paint or can I provide my own?",
        answer: "You are welcome to provide your preferred brand and shade of treatment, or we can pick up quality weather-resistant timber stain on your behalf at cost."
      }
    ]
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    shortName: "Pressure Washing",
    url: "/services/pressure-washing",
    metaTitle: "Pressure Washing in Lowestoft | ADD Gardening & Maintenance",
    metaDescription: "Pressure washing for patios, paths and driveways across Lowestoft and Waveney. £21.50/hour, fully insured, no hidden costs.",
    headline: "Pressure Washing in Lowestoft",
    subheadline: "Paths, patios, and anything else you'd like sparkling clean",
    bodyCopy: "Years of moss, grime, and weather buildup, gone. We pressure wash patios, paths, driveways, and outdoor surfaces to bring them back to looking new.",
    ctaText: "Book Pressure Washing",
    imageAltText: "Patio surface cleaned with pressure washing by ADD Gardening in Lowestoft",
    imageKey: "pressure_washing",
    iconType: "pressure",
    badgeLabel: "Patios & Paths",
    highlights: [
      "Indian sandstone, block paving, and concrete slabs",
      "Driveways, paths, garden steps, and walls",
      "Algae and black lichen removal",
      "Post-clean re-sanding and surface rinsing"
    ],
    faq: [
      {
        question: "Do you need access to an outside tap?",
        answer: "Yes, an outside water tap is required for our pressure washing equipment. We bring our own high-grade hoses, surface cleaners, and extension leads."
      }
    ]
  },
  {
    slug: "pond-maintenance",
    name: "Pond Cleaning & Maintenance",
    shortName: "Pond Maintenance",
    url: "/services/pond-maintenance",
    metaTitle: "Pond Cleaning & Maintenance in Lowestoft | ADD Gardening",
    metaDescription: "Pond cleaning and ongoing maintenance across Lowestoft and Waveney, including koi ponds. Fully insured team, £21.50/hour.",
    headline: "Pond Cleaning & Maintenance in Lowestoft",
    subheadline: "Proper pond upkeep, from someone who understands it",
    bodyCopy: "We offer pond cleaning and ongoing maintenance, including koi ponds, with the equipment and understanding needed to keep water quality and fish health in good order.",
    ctaText: "Book Pond Maintenance",
    imageAltText: "Clean garden pond with koi fish maintained by ADD Gardening in Lowestoft",
    imageKey: "pond_maintenance",
    iconType: "pond",
    badgeLabel: "Koi Specialist",
    highlights: [
      "Koi ponds and wildlife garden ponds",
      "Filter cleaning, UV bulb replacement, and pump checks",
      "Blanket weed removal and silt extraction",
      "Safe water conditioning protecting fish welfare"
    ],
    faq: [
      {
        question: "Is it safe for my fish during pond cleaning?",
        answer: "Yes, we treat fish welfare with utmost care. For deep cleans, we use oxygenated holding vats and de-chlorinated pond water so your fish stay calm and safe throughout."
      }
    ]
  },
  {
    slug: "flat-pack-assembly",
    name: "Flat-Pack Furniture Assembly",
    shortName: "Flat-Pack Assembly",
    url: "/services/flat-pack-assembly",
    metaTitle: "Flat-Pack Furniture Assembly in Lowestoft | ADD Gardening",
    metaDescription: "Flat-pack furniture assembly across Lowestoft and Waveney, so you skip the instructions and the stress. £21.50/hour, fully insured.",
    headline: "Flat-Pack Furniture Assembly in Lowestoft",
    subheadline: "Skip the instructions, skip the stress",
    bodyCopy: "Assembling flat-pack furniture can test anyone's patience. We'll put it together for you, so you don't have to translate complicated instructions or hunt for the right screw.",
    ctaText: "Book Flat-Pack Assembly",
    imageAltText: "Assembled flat-pack furniture, built by ADD Gardening and Maintenance Services",
    imageKey: "flat_pack",
    iconType: "flatpack",
    badgeLabel: "Home & Garden",
    highlights: [
      "Garden sheds, storage boxes & garden furniture",
      "Indoor wardrobes, desks, drawers & bedframes",
      "Proper leveling, anchoring, and sturdy fastening",
      "All packaging cardboard flattened and stacked"
    ],
    faq: [
      {
        question: "Can you assemble both indoor and garden furniture?",
        answer: "Yes, we assemble both outdoor items (sheds, storage benches, pergolas, rattan seating) and indoor furniture (IKEA, Argos, Dunelm wardrobes, tables, and cabinets)."
      }
    ]
  }
];

export const HOME_PAGE = {
  hero: {
    headline: "Gardening & Maintenance Services in Lowestoft",
    subheadline: "We care for your garden and home so you can enjoy it.",
    bodyCopy: "One fully insured, DBS-checked local team for lawn care, hedges, fences, pressure washing, pond maintenance and more, at a flat £21.50 an hour with no hidden costs. Covering Lowestoft, Beccles, Bungay, Great Yarmouth and the towns between.",
    ctaText: "Ask Robin for a Quote"
  },
  trustBar: {
    headline: "Reliable, Friendly, Professional",
    subheadline: "Fully insured and DBS-checked, every visit",
    bodyCopy: "We're committed to providing a safe, trustworthy and professional service you can rely on, whether it's a weekly lawn cut or a one-off pressure wash."
  },
  servicesPreview: {
    headline: "What We Do",
    bodyCopy: "Grass cutting and lawn care, hedge trimming and pruning, garden tidying, planting, fence painting, pressure washing, pond maintenance, and flat-pack furniture assembly, all from one team you already know and trust.",
    ctaText: "See All Services"
  },
  pricingCallout: {
    headline: "Clear & Transparent Pricing",
    subheadline: "£21.50 per hour",
    bodyCopy: "No hidden costs, just honest pricing. You'll know the rate before we start, and you'll never be surprised by the invoice.",
    ctaText: "Get a Quote"
  },
  faq: [
    {
      question: "What areas does ADD Gardening cover?",
      answer: "We cover Lowestoft, Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston."
    },
    {
      question: "Are you insured and vetted?",
      answer: "Yes. We're fully insured and DBS-checked, so you can have us on your property with confidence, whether you're home or not."
    },
    {
      question: "Do you only do gardens, or other jobs too?",
      answer: "Both. Alongside lawn care, hedges, and planting, we also handle fence painting, pressure washing, pond maintenance, and flat-pack furniture assembly, so you don't need a separate contractor for every job."
    }
  ]
};

export const SERVICES_HUB_PAGE = {
  headline: "Garden & Maintenance Services in Lowestoft",
  subheadline: "One team, every outdoor job",
  bodyCopy: "From weekly lawn cuts to one-off pressure washing jobs, every service below is carried out by the same insured, DBS-checked local team at a flat hourly rate.",
  ctaText: "Ask Robin About Your Job"
};

export const AREAS_PAGE = {
  headline: "Areas ADD Gardening Covers Near Lowestoft",
  subheadline: "Local, mobile, and based in Oulton Broad",
  bodyCopy: "Based in Oulton Broad, Lowestoft, we travel across the following towns and villages: Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston.",
  ctaText: "Check If We Cover Your Area",
  faq: [
    {
      question: "Do you travel outside Lowestoft?",
      answer: "Yes. We regularly cover Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston. If your town isn't listed, ask Robin and we'll confirm."
    }
  ]
};

export const PRICING_PAGE = {
  headline: "Gardening & Maintenance Pricing in Lowestoft",
  subheadline: "£21.50 per hour, no hidden costs",
  bodyCopy: "One flat hourly rate across every service we offer, from lawn care to flat-pack assembly. Bigger jobs are quoted by estimated hours upfront, so there are no surprises on the invoice.",
  ctaText: "Get a Quote",
  faq: [
    {
      question: "Is the £21.50 rate the same for every service?",
      answer: "Yes, the hourly rate is flat across all services. Larger jobs like fence painting or pond cleaning are quoted as an estimated number of hours before we start, so the total is clear upfront."
    }
  ]
};

export const ABOUT_PAGE = {
  headline: "About ADD Gardening & Maintenance Services",
  subheadline: "Local, friendly, reliable",
  bodyCopy: "We're a fully insured, DBS-checked local team based in Oulton Broad, Lowestoft, covering garden care and general outdoor maintenance across the Waveney area. We care for your garden and home so you can enjoy it, not just look after your lawn.",
  ctaText: "Ask Robin a Question"
};

export const CONTACT_PAGE = {
  headline: "Get a Quote From ADD Gardening in Lowestoft",
  subheadline: "Chat with Robin, or call us directly",
  bodyCopy: "Robin can answer questions about any service, confirm we cover your area, and get your quote request sent through. Prefer to talk it through? Call 07538 482844 or email addgardens1@gmail.com.",
  ctaText: "Start Chatting With Robin",
  faq: [
    {
      question: "What information do I need to get a quote?",
      answer: "Robin will ask for your name, contact details, your town, which service you need, and a rough sense of the job size, then confirm we cover your area and pass the request through so we can follow up with a quote."
    }
  ]
};
