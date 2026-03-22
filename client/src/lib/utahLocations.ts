// Utah county and city data for local SEO pages
// Population figures from 2020 US Census / Utah Governor's Office of Planning & Budget

export interface CountyData {
  slug: string;
  name: string;
  population: number;
  seat: string;         // County seat city
  featured: boolean;    // Top 8 by population — get full detail pages
  tagline: string;
  description: string;
  keyIndustries: string[];
  cities: string[];     // Major cities in this county
  stats: { label: string; value: string }[];
}

export interface CityData {
  slug: string;
  name: string;
  county: string;       // County slug
  population: number;
  featured: boolean;    // Top ~20 by population — get full detail pages
  tagline: string;
  description: string;
  keyIndustries: string[];
}

// ─── ALL 29 UTAH COUNTIES ────────────────────────────────────────────────────

export const COUNTIES: CountyData[] = [
  {
    slug: "salt-lake",
    name: "Salt Lake County",
    population: 1185238,
    seat: "Salt Lake City",
    featured: true,
    tagline: "Utah's Business Hub — Merchant Services Built for the Wasatch Front",
    description:
      "Salt Lake County is Utah's most populous county and the economic engine of the Intermountain West. From downtown Salt Lake City's thriving restaurant and retail scene to the tech corridor in Sandy and Draper, businesses here need payment solutions that can keep up with high transaction volumes, diverse customer bases, and rapid growth.",
    keyIndustries: ["Restaurants & Bars", "Retail", "Technology", "Healthcare", "Hospitality"],
    cities: ["Salt Lake City", "West Valley City", "Sandy", "West Jordan", "South Jordan", "Taylorsville", "Murray", "Millcreek", "Draper", "Cottonwood Heights", "Holladay", "Midvale"],
    stats: [
      { label: "Population", value: "1.18M+" },
      { label: "Businesses", value: "60,000+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "utah",
    name: "Utah County",
    population: 636235,
    seat: "Provo",
    featured: true,
    tagline: "Silicon Slopes & Main Street — Payment Solutions for Utah County's Diverse Economy",
    description:
      "Utah County is home to Silicon Slopes' fastest-growing tech companies, BYU's vibrant student economy, and a thriving small-business corridor stretching from Provo to Lehi. Whether you're running a restaurant near campus, a retail shop in American Fork, or a high-growth SaaS startup, UBC Unlimited delivers payment infrastructure that scales with you.",
    keyIndustries: ["Technology / SaaS", "Restaurants", "Retail", "Education", "Healthcare"],
    cities: ["Provo", "Orem", "Lehi", "American Fork", "Pleasant Grove", "Springville", "Spanish Fork", "Payson", "Saratoga Springs", "Eagle Mountain", "Vineyard"],
    stats: [
      { label: "Population", value: "636K+" },
      { label: "Tech Companies", value: "1,000+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "davis",
    name: "Davis County",
    population: 362679,
    seat: "Farmington",
    featured: true,
    tagline: "North of the Valley — Merchant Services for Davis County's Growing Communities",
    description:
      "Davis County sits between Salt Lake and Weber counties, with a rapidly expanding retail and restaurant corridor along I-15. From Bountiful's established small businesses to the newer commercial developments in Kaysville and Layton, Davis County businesses benefit from UBC Unlimited's local expertise and competitive processing rates.",
    keyIndustries: ["Retail", "Restaurants", "Healthcare", "Defense / Government Contractors", "Auto Services"],
    cities: ["Layton", "Bountiful", "Clearfield", "Kaysville", "Syracuse", "Clinton", "Farmington", "North Salt Lake"],
    stats: [
      { label: "Population", value: "362K+" },
      { label: "Businesses", value: "12,000+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "weber",
    name: "Weber County",
    population: 262220,
    seat: "Ogden",
    featured: true,
    tagline: "Ogden's Renaissance — Modern Payment Solutions for Weber County Businesses",
    description:
      "Weber County anchors the northern Wasatch Front, with Ogden's revitalized downtown driving a surge in restaurants, breweries, outdoor retail, and hospitality. The county's diverse economy — spanning manufacturing, healthcare, and a growing outdoor recreation industry — demands flexible, industry-specific payment solutions. UBC Unlimited has been serving Weber County businesses for over 20 years.",
    keyIndustries: ["Restaurants & Breweries", "Outdoor Retail", "Manufacturing", "Healthcare", "Hospitality"],
    cities: ["Ogden", "Roy", "Layton", "Washington Terrace", "South Ogden", "Riverdale", "North Ogden", "Pleasant View"],
    stats: [
      { label: "Population", value: "262K+" },
      { label: "Businesses", value: "9,000+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "washington",
    name: "Washington County",
    population: 180279,
    seat: "St. George",
    featured: true,
    tagline: "Utah's Dixie — Payment Solutions for St. George's Booming Economy",
    description:
      "Washington County is one of the fastest-growing counties in the United States, fueled by St. George's explosive population growth, tourism from Zion National Park, and a thriving retirement and second-home market. Restaurants, hotels, retail shops, and service businesses here need reliable, scalable payment processing — and UBC Unlimited delivers it with local support.",
    keyIndustries: ["Tourism & Hospitality", "Restaurants", "Retail", "Real Estate", "Healthcare"],
    cities: ["St. George", "Washington", "Hurricane", "Ivins", "Santa Clara", "La Verkin", "Toquerville"],
    stats: [
      { label: "Population", value: "180K+" },
      { label: "Tourism/yr", value: "4.5M+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "cache",
    name: "Cache County",
    population: 133154,
    seat: "Logan",
    featured: true,
    tagline: "Cache Valley's College Town Economy — Merchant Services for Logan & Beyond",
    description:
      "Cache County is home to Utah State University and a vibrant college-town economy in Logan, surrounded by agricultural communities and a growing manufacturing base. From campus-area restaurants and retail to agricultural equipment dealers and service businesses, UBC Unlimited provides payment solutions tailored to Cache Valley's unique business mix.",
    keyIndustries: ["Restaurants", "Retail", "Agriculture", "Manufacturing", "Education"],
    cities: ["Logan", "North Logan", "Providence", "Smithfield", "Hyde Park", "Hyrum", "Richmond"],
    stats: [
      { label: "Population", value: "133K+" },
      { label: "USU Students", value: "28,000+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "tooele",
    name: "Tooele County",
    population: 72698,
    seat: "Tooele",
    featured: true,
    tagline: "West of the Valley — Merchant Services for Tooele County's Growing Communities",
    description:
      "Tooele County is one of Utah's fastest-growing counties by percentage, with new residential and commercial development expanding rapidly west of Salt Lake. From Tooele City's established Main Street businesses to new retail and restaurant developments in Stansbury Park, UBC Unlimited provides the payment infrastructure to support the county's growth.",
    keyIndustries: ["Retail", "Restaurants", "Auto Services", "Mining & Industrial", "Healthcare"],
    cities: ["Tooele", "Stansbury Park", "Grantsville", "Erda"],
    stats: [
      { label: "Population", value: "72K+" },
      { label: "Growth Rate", value: "Top 5 in UT" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  {
    slug: "summit",
    name: "Summit County",
    population: 42357,
    seat: "Coalville",
    featured: true,
    tagline: "Park City & Beyond — Premium Payment Solutions for Summit County's Resort Economy",
    description:
      "Summit County is home to Park City — one of the most visited ski resort towns in North America — and hosts the Sundance Film Festival, world-class mountain biking, and a thriving luxury hospitality scene. High-volume seasonal businesses, upscale restaurants, boutique retail, and luxury lodging all require payment solutions that handle peak traffic without missing a beat.",
    keyIndustries: ["Luxury Hospitality", "Restaurants & Bars", "Boutique Retail", "Real Estate", "Outdoor Recreation"],
    cities: ["Park City", "Coalville", "Kamas", "Heber City"],
    stats: [
      { label: "Population", value: "42K+" },
      { label: "Ski Visits/yr", value: "1.5M+" },
      { label: "Avg Savings", value: "Up to 40%" },
      { label: "Setup Time", value: "24–48 hrs" },
    ],
  },
  // Non-featured counties — appear in finder but link to generic service page
  { slug: "box-elder", name: "Box Elder County", population: 57697, seat: "Brigham City", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Brigham City", "Perry", "Tremonton"], stats: [] },
  { slug: "iron", name: "Iron County", population: 57287, seat: "Parowan", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Cedar City", "Enoch", "Parowan"], stats: [] },
  { slug: "sanpete", name: "Sanpete County", population: 30939, seat: "Manti", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Ephraim", "Manti", "Mount Pleasant"], stats: [] },
  { slug: "uintah", name: "Uintah County", population: 36323, seat: "Vernal", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Vernal", "Naples", "Jensen"], stats: [] },
  { slug: "sevier", name: "Sevier County", population: 21522, seat: "Richfield", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Richfield", "Salina", "Monroe"], stats: [] },
  { slug: "duchesne", name: "Duchesne County", population: 20219, seat: "Duchesne", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Roosevelt", "Duchesne", "Myton"], stats: [] },
  { slug: "carbon", name: "Carbon County", population: 20463, seat: "Price", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Price", "Helper", "East Carbon"], stats: [] },
  { slug: "millard", name: "Millard County", population: 12990, seat: "Fillmore", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Delta", "Fillmore", "Holden"], stats: [] },
  { slug: "emery", name: "Emery County", population: 10086, seat: "Castle Dale", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Ferron", "Castle Dale", "Huntington"], stats: [] },
  { slug: "kane", name: "Kane County", population: 7886, seat: "Kanab", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Kanab", "Big Water", "Orderville"], stats: [] },
  { slug: "beaver", name: "Beaver County", population: 6710, seat: "Beaver", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Beaver", "Milford", "Minersville"], stats: [] },
  { slug: "grand", name: "Grand County", population: 9754, seat: "Moab", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Moab", "Castle Valley"], stats: [] },
  { slug: "san-juan", name: "San Juan County", population: 15308, seat: "Monticello", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Blanding", "Monticello", "Moab"], stats: [] },
  { slug: "garfield", name: "Garfield County", population: 5051, seat: "Panguitch", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Panguitch", "Escalante", "Boulder"], stats: [] },
  { slug: "wayne", name: "Wayne County", population: 2778, seat: "Loa", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Loa", "Torrey", "Bicknell"], stats: [] },
  { slug: "piute", name: "Piute County", population: 1476, seat: "Junction", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Junction", "Marysvale"], stats: [] },
  { slug: "rich", name: "Rich County", population: 2479, seat: "Randolph", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Randolph", "Garden City"], stats: [] },
  { slug: "morgan", name: "Morgan County", population: 12124, seat: "Morgan", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Morgan", "Croydon"], stats: [] },
  { slug: "wasatch", name: "Wasatch County", population: 34788, seat: "Heber City", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Heber City", "Midway", "Wallsburg"], stats: [] },
  { slug: "juab", name: "Juab County", population: 11918, seat: "Nephi", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Nephi", "Mona", "Levan"], stats: [] },
  { slug: "daggett", name: "Daggett County", population: 1160, seat: "Manila", featured: false, tagline: "", description: "", keyIndustries: [], cities: ["Manila", "Dutch John"], stats: [] },
];

// ─── FEATURED CITIES (top ~20 by population) ─────────────────────────────────

export const CITIES: CityData[] = [
  {
    slug: "salt-lake-city",
    name: "Salt Lake City",
    county: "salt-lake",
    population: 200567,
    featured: true,
    tagline: "Utah's Capital City — Payment Solutions Built for Salt Lake's Diverse Business Scene",
    description:
      "Salt Lake City is the economic, cultural, and governmental hub of Utah. From the bustling restaurant row on 9th & 9th to the high-volume retail on State Street, and from the tech startups in the Granary District to the established healthcare systems on the east bench — every type of business here needs a payment partner that understands their industry. UBC Unlimited has been serving Salt Lake City businesses for over 20 years.",
    keyIndustries: ["Restaurants & Bars", "Retail", "Technology", "Healthcare", "Hospitality & Hotels"],
  },
  {
    slug: "west-valley-city",
    name: "West Valley City",
    county: "salt-lake",
    population: 140230,
    featured: true,
    tagline: "West Valley's Business Community — Competitive Payment Processing for Every Industry",
    description:
      "West Valley City is Utah's second-largest city and a major commercial hub, home to a diverse mix of restaurants, retail centers, auto dealerships, and service businesses. UBC Unlimited provides West Valley businesses with competitive rates, local support, and industry-specific solutions that help them keep more of every sale.",
    keyIndustries: ["Restaurants", "Auto Dealers & Services", "Retail", "Healthcare", "Service Businesses"],
  },
  {
    slug: "provo",
    name: "Provo",
    county: "utah",
    population: 115264,
    featured: true,
    tagline: "Silicon Slopes' College Town — Merchant Services for Provo's Thriving Economy",
    description:
      "Provo is the heart of Utah County's economy, anchored by Brigham Young University and a rapidly growing tech and startup ecosystem. The city's diverse business landscape — from student-oriented restaurants and retail to high-growth SaaS companies — demands payment solutions that scale from day one. UBC Unlimited delivers exactly that.",
    keyIndustries: ["Restaurants", "Retail", "Technology / Startups", "Education Services", "Healthcare"],
  },
  {
    slug: "orem",
    name: "Orem",
    county: "utah",
    population: 98129,
    featured: true,
    tagline: "Family Business Capital of Utah County — Merchant Services for Orem's Main Street",
    description:
      "Orem is one of Utah's most business-friendly cities, with a thriving retail corridor along State Street and a growing mix of restaurants, service businesses, and healthcare providers. UBC Unlimited's local team knows Orem's business community and delivers payment solutions tailored to each industry.",
    keyIndustries: ["Retail", "Restaurants", "Healthcare", "Auto Services", "Service Businesses"],
  },
  {
    slug: "ogden",
    name: "Ogden",
    county: "weber",
    population: 87321,
    featured: true,
    tagline: "Ogden's Renaissance — Modern Payment Solutions for Utah's Adventure City",
    description:
      "Ogden's revitalized Historic 25th Street is one of Utah's most vibrant dining and entertainment districts, and the city's outdoor recreation economy draws visitors year-round. From breweries and farm-to-table restaurants to outdoor gear retailers and boutique hotels, Ogden businesses need payment processing that handles high foot traffic and seasonal volume spikes.",
    keyIndustries: ["Restaurants & Breweries", "Outdoor Retail", "Hospitality", "Healthcare", "Manufacturing"],
  },
  {
    slug: "st-george",
    name: "St. George",
    county: "washington",
    population: 95342,
    featured: true,
    tagline: "Utah's Fastest-Growing City — Payment Solutions for St. George's Booming Economy",
    description:
      "St. George is one of the fastest-growing cities in the United States, fueled by tourism from Zion National Park, a thriving retirement community, and explosive residential and commercial development. Restaurants, hotels, retail shops, and service businesses here need reliable, scalable payment processing — and UBC Unlimited delivers it with local support.",
    keyIndustries: ["Tourism & Hospitality", "Restaurants", "Retail", "Healthcare", "Real Estate Services"],
  },
  {
    slug: "sandy",
    name: "Sandy",
    county: "salt-lake",
    population: 96904,
    featured: true,
    tagline: "South Valley's Business Hub — Merchant Services for Sandy's Diverse Economy",
    description:
      "Sandy is home to one of Utah's premier retail destinations — the Fashion Place Mall corridor — as well as a thriving restaurant scene, healthcare providers, and a growing tech presence. UBC Unlimited's local team serves Sandy businesses with competitive rates and industry-specific solutions.",
    keyIndustries: ["Retail", "Restaurants", "Healthcare", "Technology", "Auto Services"],
  },
  {
    slug: "west-jordan",
    name: "West Jordan",
    county: "salt-lake",
    population: 116961,
    featured: true,
    tagline: "West Jordan's Growing Economy — Merchant Services for Utah's 4th Largest City",
    description:
      "West Jordan is one of Utah's fastest-growing cities, with a diverse economy spanning retail, restaurants, healthcare, and professional services. UBC Unlimited provides West Jordan businesses with the payment infrastructure to compete and grow, backed by local support and transparent pricing.",
    keyIndustries: ["Retail", "Restaurants", "Healthcare", "Professional Services", "Auto Services"],
  },
  {
    slug: "layton",
    name: "Layton",
    county: "davis",
    population: 82684,
    featured: true,
    tagline: "Davis County's Commercial Center — Payment Solutions for Layton's Business Community",
    description:
      "Layton is Davis County's largest city and a major commercial hub, anchored by the Layton Hills Mall corridor and a thriving restaurant and service business scene. Hill Air Force Base drives significant economic activity in the area. UBC Unlimited serves Layton businesses with competitive rates and local expertise.",
    keyIndustries: ["Retail", "Restaurants", "Auto Services", "Healthcare", "Defense Contractors"],
  },
  {
    slug: "south-jordan",
    name: "South Jordan",
    county: "salt-lake",
    population: 77487,
    featured: true,
    tagline: "South Jordan's Rapid Growth — Merchant Services for the Daybreak Corridor",
    description:
      "South Jordan is one of Utah's fastest-growing communities, with the massive Daybreak development bringing thousands of new residents and businesses to the area. From new restaurants and retail to healthcare and professional services, South Jordan businesses need payment solutions that grow with them.",
    keyIndustries: ["Restaurants", "Retail", "Healthcare", "Professional Services", "Real Estate Services"],
  },
  {
    slug: "lehi",
    name: "Lehi",
    county: "utah",
    population: 75907,
    featured: true,
    tagline: "Silicon Slopes HQ — Payment Solutions for Lehi's Tech-Driven Economy",
    description:
      "Lehi is the epicenter of Silicon Slopes, home to Adobe, Ancestry, IM Flash, and hundreds of high-growth tech companies. But it's also a thriving community with restaurants, retail, and service businesses serving a rapidly growing population. UBC Unlimited provides Lehi businesses — from tech startups to Main Street shops — with payment infrastructure that scales.",
    keyIndustries: ["Technology / SaaS", "Restaurants", "Retail", "Healthcare", "Professional Services"],
  },
  {
    slug: "taylorsville",
    name: "Taylorsville",
    county: "salt-lake",
    population: 60519,
    featured: true,
    tagline: "Taylorsville's Diverse Business Community — Competitive Merchant Services",
    description:
      "Taylorsville is a densely populated Salt Lake suburb with a diverse mix of restaurants, retail, auto services, and healthcare providers. UBC Unlimited's local team serves Taylorsville businesses with transparent pricing and industry-specific solutions that reduce processing costs.",
    keyIndustries: ["Restaurants", "Retail", "Auto Services", "Healthcare", "Service Businesses"],
  },
  {
    slug: "murray",
    name: "Murray",
    county: "salt-lake",
    population: 50637,
    featured: true,
    tagline: "Murray's Medical Mile & Main Street — Merchant Services for Every Business Type",
    description:
      "Murray is home to Intermountain Medical Center — one of Utah's largest hospitals — as well as a thriving retail and restaurant corridor along State Street. The city's mix of healthcare, retail, and service businesses makes it one of Salt Lake County's most economically diverse communities.",
    keyIndustries: ["Healthcare", "Retail", "Restaurants", "Auto Services", "Professional Services"],
  },
  {
    slug: "bountiful",
    name: "Bountiful",
    county: "davis",
    population: 45215,
    featured: true,
    tagline: "Bountiful's Established Business Community — Local Merchant Services Expertise",
    description:
      "Bountiful is one of Davis County's most established communities, with a thriving Main Street business district, strong healthcare presence, and a mix of restaurants and retail. UBC Unlimited has served Bountiful businesses for years, delivering competitive rates and the kind of local support you can't get from a national processor.",
    keyIndustries: ["Healthcare", "Restaurants", "Retail", "Professional Services", "Auto Services"],
  },
  {
    slug: "clearfield",
    name: "Clearfield",
    county: "davis",
    population: 32646,
    featured: true,
    tagline: "Clearfield's Growing Economy — Merchant Services Near Hill Air Force Base",
    description:
      "Clearfield's proximity to Hill Air Force Base drives significant economic activity, with a diverse mix of retail, restaurants, and service businesses serving both military and civilian populations. UBC Unlimited provides Clearfield businesses with competitive processing rates and local support.",
    keyIndustries: ["Retail", "Restaurants", "Auto Services", "Service Businesses", "Healthcare"],
  },
  {
    slug: "logan",
    name: "Logan",
    county: "cache",
    population: 52778,
    featured: true,
    tagline: "Cache Valley's College Town — Merchant Services for Logan's Vibrant Economy",
    description:
      "Logan is Cache Valley's economic hub and home to Utah State University, creating a vibrant college-town economy with a diverse mix of restaurants, retail, and service businesses. UBC Unlimited serves Logan businesses with payment solutions tailored to the unique demands of a university community.",
    keyIndustries: ["Restaurants", "Retail", "Education Services", "Healthcare", "Service Businesses"],
  },
  {
    slug: "park-city",
    name: "Park City",
    county: "summit",
    population: 8405,
    featured: true,
    tagline: "World-Class Resort Town — Premium Payment Solutions for Park City's Luxury Economy",
    description:
      "Park City is one of North America's premier ski resort destinations, hosting the Sundance Film Festival and attracting millions of visitors annually. High-volume seasonal businesses, upscale restaurants, boutique retail, and luxury lodging all require payment solutions that handle peak traffic without missing a beat. UBC Unlimited delivers enterprise-grade processing with local support.",
    keyIndustries: ["Luxury Hospitality", "Restaurants & Bars", "Boutique Retail", "Real Estate", "Outdoor Recreation"],
  },
  {
    slug: "american-fork",
    name: "American Fork",
    county: "utah",
    population: 33337,
    featured: true,
    tagline: "American Fork's Growing Business Community — Merchant Services in Silicon Slopes",
    description:
      "American Fork sits in the heart of Silicon Slopes and has seen explosive commercial growth alongside its residential expansion. From tech company cafeterias to Main Street restaurants and retail, UBC Unlimited provides American Fork businesses with competitive payment processing and local expertise.",
    keyIndustries: ["Technology", "Restaurants", "Retail", "Healthcare", "Professional Services"],
  },
  {
    slug: "springville",
    name: "Springville",
    county: "utah",
    population: 35268,
    featured: true,
    tagline: "Art City's Business Scene — Merchant Services for Springville's Growing Economy",
    description:
      "Springville — Utah's 'Art City' — has a growing commercial corridor with restaurants, retail, and service businesses serving a rapidly expanding population. UBC Unlimited provides Springville businesses with the payment infrastructure to compete and grow.",
    keyIndustries: ["Restaurants", "Retail", "Auto Services", "Healthcare", "Service Businesses"],
  },
  {
    slug: "spanish-fork",
    name: "Spanish Fork",
    county: "utah",
    population: 42602,
    featured: true,
    tagline: "Spanish Fork's Expanding Economy — Competitive Merchant Services in South Utah County",
    description:
      "Spanish Fork is one of Utah County's fastest-growing cities, with new commercial development following its rapid residential expansion. From restaurants and retail to auto services and healthcare, UBC Unlimited serves Spanish Fork businesses with transparent pricing and local support.",
    keyIndustries: ["Restaurants", "Retail", "Auto Services", "Healthcare", "Service Businesses"],
  },
  // ─── NON-FEATURED CITIES (link to consultation) ───────────────────────────
  { slug: "eagle-mountain", name: "Eagle Mountain", county: "utah", population: 43623, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "saratoga-springs", name: "Saratoga Springs", county: "utah", population: 33879, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "pleasant-grove", name: "Pleasant Grove", county: "utah", population: 40264, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "riverton", name: "Riverton", county: "salt-lake", population: 45285, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "herriman", name: "Herriman", county: "salt-lake", population: 56306, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "draper", name: "Draper", county: "salt-lake", population: 51017, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "cottonwood-heights", name: "Cottonwood Heights", county: "salt-lake", population: 34108, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "holladay", name: "Holladay", county: "salt-lake", population: 31168, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "midvale", name: "Midvale", county: "salt-lake", population: 34124, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "millcreek", name: "Millcreek", county: "salt-lake", population: 62139, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "kearns", name: "Kearns", county: "salt-lake", population: 35731, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "magna", name: "Magna", county: "salt-lake", population: 29096, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "bluffdale", name: "Bluffdale", county: "salt-lake", population: 15942, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "vineyard", name: "Vineyard", county: "utah", population: 18068, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "payson", name: "Payson", county: "utah", population: 21487, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "mapleton", name: "Mapleton", county: "utah", population: 11806, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "santaquin", name: "Santaquin", county: "utah", population: 12765, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "lindon", name: "Lindon", county: "utah", population: 11074, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "cedar-hills", name: "Cedar Hills", county: "utah", population: 10146, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "highland", name: "Highland", county: "utah", population: 18600, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "alpine", name: "Alpine", county: "utah", population: 10466, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "cedar-city", name: "Cedar City", county: "iron", population: 35235, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "moab", name: "Moab", county: "grand", population: 5322, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "vernal", name: "Vernal", county: "uintah", population: 10587, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "price", name: "Price", county: "carbon", population: 8715, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "richfield", name: "Richfield", county: "sevier", population: 8379, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "kanab", name: "Kanab", county: "kane", population: 4656, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "brigham-city", name: "Brigham City", county: "box-elder", population: 19661, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "tremonton", name: "Tremonton", county: "box-elder", population: 9643, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "heber-city", name: "Heber City", county: "wasatch", population: 16856, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "midway", name: "Midway", county: "wasatch", population: 5862, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "nephi", name: "Nephi", county: "juab", population: 5389, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "roosevelt", name: "Roosevelt", county: "duchesne", population: 7144, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "blanding", name: "Blanding", county: "san-juan", population: 3375, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "monticello", name: "Monticello", county: "san-juan", population: 1972, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "delta", name: "Delta", county: "millard", population: 3436, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "fillmore", name: "Fillmore", county: "millard", population: 2435, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "ephraim", name: "Ephraim", county: "sanpete", population: 7144, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "manti", name: "Manti", county: "sanpete", population: 3276, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "mount-pleasant", name: "Mount Pleasant", county: "sanpete", population: 3464, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "panguitch", name: "Panguitch", county: "garfield", population: 1520, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "escalante", name: "Escalante", county: "garfield", population: 797, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "beaver", name: "Beaver", county: "beaver", population: 3331, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "milford", name: "Milford", county: "beaver", population: 1401, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "torrey", name: "Torrey", county: "wayne", population: 179, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "loa", name: "Loa", county: "wayne", population: 604, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "manila", name: "Manila", county: "daggett", population: 310, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "garden-city", name: "Garden City", county: "rich", population: 591, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "morgan", name: "Morgan", county: "morgan", population: 4613, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "randolph", name: "Randolph", county: "rich", population: 491, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "junction", name: "Junction", county: "piute", population: 190, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "marysvale", name: "Marysvale", county: "piute", population: 414, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "enoch", name: "Enoch", county: "iron", population: 7516, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "parowan", name: "Parowan", county: "iron", population: 3066, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "north-ogden", name: "North Ogden", county: "weber", population: 20166, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "south-ogden", name: "South Ogden", county: "weber", population: 16532, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "washington-terrace", name: "Washington Terrace", county: "weber", population: 9418, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "riverdale", name: "Riverdale", county: "weber", population: 9028, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "roy", name: "Roy", county: "weber", population: 40581, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "sunset", name: "Sunset", county: "davis", population: 5765, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "syracuse", name: "Syracuse", county: "davis", population: 34261, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "kaysville", name: "Kaysville", county: "davis", population: 33173, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "farmington", name: "Farmington", county: "davis", population: 23461, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "centerville", name: "Centerville", county: "davis", population: 17926, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "north-salt-lake", name: "North Salt Lake", county: "davis", population: 21080, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "woods-cross", name: "Woods Cross", county: "davis", population: 11431, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "clinton", name: "Clinton", county: "davis", population: 22196, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "west-bountiful", name: "West Bountiful", county: "davis", population: 5575, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "hyde-park", name: "Hyde Park", county: "cache", population: 4937, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "smithfield", name: "Smithfield", county: "cache", population: 12324, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "north-logan", name: "North Logan", county: "cache", population: 11028, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "providence", name: "Providence", county: "cache", population: 8438, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "nibley", name: "Nibley", county: "cache", population: 7246, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "millville", name: "Millville", county: "cache", population: 3498, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "hyrum", name: "Hyrum", county: "cache", population: 8397, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "richmond", name: "Richmond", county: "cache", population: 2842, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "wellsville", name: "Wellsville", county: "cache", population: 3432, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "ivins", name: "Ivins", county: "washington", population: 11691, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "santa-clara", name: "Santa Clara", county: "washington", population: 8685, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "washington", name: "Washington", county: "washington", population: 28710, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "hurricane", name: "Hurricane", county: "washington", population: 20036, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "la-verkin", name: "La Verkin", county: "washington", population: 4617, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "toquerville", name: "Toquerville", county: "washington", population: 2180, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "enterprise", name: "Enterprise", county: "washington", population: 1711, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "hildale", name: "Hildale", county: "washington", population: 2726, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "tooele", name: "Tooele", county: "tooele", population: 38905, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "grantsville", name: "Grantsville", county: "tooele", population: 12617, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "stansbury-park", name: "Stansbury Park", county: "tooele", population: 8568, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "erda", name: "Erda", county: "tooele", population: 5210, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "helper", name: "Helper", county: "carbon", population: 1944, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "huntington", name: "Huntington", county: "emery", population: 2131, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "castle-dale", name: "Castle Dale", county: "emery", population: 1630, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "ferron", name: "Ferron", county: "emery", population: 1608, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "duchesne", name: "Duchesne", county: "duchesne", population: 1770, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "myton", name: "Myton", county: "duchesne", population: 601, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "salina", name: "Salina", county: "sevier", population: 2489, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "monroe", name: "Monroe", county: "sevier", population: 2253, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "big-water", name: "Big Water", county: "kane", population: 591, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "orderville", name: "Orderville", county: "kane", population: 594, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "minersville", name: "Minersville", county: "beaver", population: 1012, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "bicknell", name: "Bicknell", county: "wayne", population: 306, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "boulder", name: "Boulder", county: "garfield", population: 226, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "croydon", name: "Croydon", county: "morgan", population: 789, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "wallsburg", name: "Wallsburg", county: "wasatch", population: 267, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "dutch-john", name: "Dutch John", county: "daggett", population: 147, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "jensen", name: "Jensen", county: "uintah", population: 456, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "naples", name: "Naples", county: "uintah", population: 1756, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "perry", name: "Perry", county: "box-elder", population: 5228, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "levan", name: "Levan", county: "juab", population: 1053, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "mona", name: "Mona", county: "juab", population: 1671, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "holden", name: "Holden", county: "millard", population: 415, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "spring-city", name: "Spring City", county: "sanpete", population: 1047, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "gunnison", name: "Gunnison", county: "sanpete", population: 3589, featured: false, tagline: "", description: "", keyIndustries: [] },
  { slug: "moroni", name: "Moroni", county: "sanpete", population: 1412, featured: false, tagline: "", description: "", keyIndustries: [] },
];

// Helper: get all county names sorted alphabetically for the finder
export const ALL_COUNTY_NAMES = COUNTIES.map((c) => c.name).sort();

// Helper: get all city names sorted alphabetically for the finder
export const ALL_CITY_NAMES = CITIES.map((c) => c.name).sort();

// Helper: find county by slug
export const getCounty = (slug: string) => COUNTIES.find((c) => c.slug === slug);

// Helper: find city by slug
export const getCity = (slug: string) => CITIES.find((c) => c.slug === slug);

// Featured counties (top 8)
export const FEATURED_COUNTIES = COUNTIES.filter((c) => c.featured);

// Featured cities (top 20)
export const FEATURED_CITIES = CITIES.filter((c) => c.featured);
