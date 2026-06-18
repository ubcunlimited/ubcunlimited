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
  { slug: "box-elder", name: "Box Elder County", population: 57697, seat: "Brigham City", featured: false, tagline: "Empowering Box Elder County Businesses with Tailored Merchant Services Solutions", description: "Box Elder County, located in northern Utah, is a region characterized by its diverse economic landscape and strategic geographical position. With Brigham City as its county seat and a population of 57,697, the county is a vital hub for agriculture, particularly grain and livestock production, which forms the backbone of its rural economy. Beyond its agricultural roots, Box Elder County benefits significantly from the I-15 corridor, fostering robust commerce and serving as a critical transportation artery. The presence of Thiokol/ATK aerospace manufacturing facilities highlights a strong industrial sector, contributing to high-tech employment and innovation. Furthermore, the county is experiencing growing residential development, indicating a dynamic and expanding community.\n\nUBC Unlimited is uniquely positioned to support the varied business needs across Box Elder County. For agricultural enterprises, we offer specialized payment processing solutions that streamline transactions, whether for farm-to-market sales or equipment purchases, ensuring efficiency and reliability. Businesses along the bustling I-15 corridor, including retail and service providers, can leverage our advanced point-of-sale systems and secure online payment gateways to enhance customer experience and manage high transaction volumes. Our expertise extends to the aerospace sector, providing secure and efficient payment systems for suppliers and contractors, while also supporting the burgeoning residential market with solutions for home services and local businesses.\n\nAs a local Utah company, UBC Unlimited understands the unique economic rhythms and community values of Box Elder County. We are committed to providing personalized support and cutting-edge merchant services that help local businesses thrive, from the family farms of Tremonton to the manufacturing plants near Brigham City. Partner with UBC Unlimited to optimize your payment processing, reduce costs, and gain a competitive edge with a trusted local partner dedicated to your success. Contact us today to discover how we can tailor solutions for your Box Elder County business.", keyIndustries: ["Agriculture", "Aerospace", "Retail", "Logistics", "Real Estate"], cities: ["Brigham City", "Perry", "Tremonton"], stats: [{ label: "Population", value: "57,697" }, { label: "County Seat", value: "Brigham City" }, { label: "Known For", value: "Agriculture & Aerospace" }, { label: "Key Corridor", value: "I-15" }] },
  {
    slug: "iron",
    name: "Iron County",
    population: 57287,
    seat: "Parowan",
    featured: false,
    tagline: "Southern Utah's Commercial Hub — Merchant Services for Iron County Businesses",
    description:
      "Iron County anchors southwestern Utah's economy, with Cedar City serving as the commercial and cultural center of the region. Home to Southern Utah University, a thriving arts scene, and a growing healthcare sector, Iron County attracts a diverse mix of retail, hospitality, and service businesses. The county's population has grown steadily as remote workers and retirees relocate from larger metros, driving demand for local services and consumer spending.\n\nUBC Unlimited provides Iron County businesses with the same competitive merchant services available to Salt Lake City companies — without the big-city overhead. Whether you operate a restaurant on Main Street in Cedar City, a retail boutique near SUU's campus, a medical practice, or a service company serving the surrounding rural communities, we tailor a payment solution to your specific transaction volume, card mix, and business model.\n\nOur Iron County clients benefit from interchange-plus pricing that passes through the actual card cost rather than marking up a tiered rate. We offer same-day or next-day funding, no long-term contracts, and a dedicated local Utah rep who answers the phone when you call. For businesses looking to eliminate processing costs entirely, our cash discount and dual pricing programs are fully compliant and available on most POS systems and terminals.\n\nFrom Cedar City's growing downtown corridor to the communities of Enoch and Parowan, UBC Unlimited is the merchant services partner that understands the Iron County market. Contact us for a free statement review.",
    keyIndustries: ["Restaurants & Hospitality", "Retail", "Healthcare", "Professional Services", "Education-Adjacent Businesses"],
    cities: ["Cedar City", "Enoch", "Parowan"],
    stats: [
      { label: "Population", value: "57,287" },
      { label: "County Seat", value: "Parowan" },
      { label: "Largest City", value: "Cedar City" },
      { label: "Home of", value: "Southern Utah University" },
    ],
  },
  {
    slug: "sanpete",
    name: "Sanpete County",
    population: 30939,
    seat: "Manti",
    featured: false,
    tagline: "Central Utah's Heritage Valley — Merchant Services for Sanpete County Businesses",
    description:
      "Sanpete County sits in the heart of central Utah, a region defined by agricultural heritage, small-town commerce, and a tight-knit community of independent business owners. The county's largest communities — Ephraim, Manti, Mount Pleasant, and Gunnison — each support a mix of retail, food service, agricultural supply, and professional service businesses that form the backbone of the local economy.\n\nUBC Unlimited brings big-city payment technology to Sanpete County's small-town businesses. We work with local retailers, restaurants, farm supply stores, medical offices, and service providers to reduce processing costs and streamline how they accept payments. Our approach is straightforward: we analyze your current processing statement, identify where you're overpaying, and build a custom solution with transparent, competitive pricing.\n\nFor Sanpete County businesses, we offer in-person card processing with EMV and contactless support, mobile payment solutions for farmers markets and on-site service calls, and virtual terminals for phone and mail-order transactions. Our cash discount and dual pricing programs are popular with local businesses looking to offset processing costs without raising prices across the board.\n\nWith a dedicated Utah rep who understands rural business realities — seasonal volume swings, limited banking options, and the importance of reliable equipment — UBC Unlimited is the merchant services partner built for Sanpete County. Reach out for a free, no-obligation statement review.",
    keyIndustries: ["Agriculture & Farm Supply", "Retail", "Food Service", "Healthcare", "Professional Services"],
    cities: ["Ephraim", "Manti", "Mount Pleasant"],
    stats: [
      { label: "Population", value: "30,939" },
      { label: "County Seat", value: "Manti" },
      { label: "Largest City", value: "Ephraim" },
      { label: "Known For", value: "Agriculture & Heritage" },
    ],
  },
  { slug: "uintah", name: "Uintah County", population: 36323, seat: "Vernal", featured: false, tagline: "Merchant Services for Uintah County's Energy, Tourism, and Agricultural Businesses", description: "Uintah County, nestled in the scenic Uinta Basin of eastern Utah, is a region defined by its rich natural resources and vibrant community spirit. The county's economy is primarily driven by the robust oil and gas industry, which leverages the vast reserves of the Uinta Basin, providing significant employment and economic activity. Beyond energy, Uintah County is a renowned destination for dinosaur fossil tourism, drawing visitors globally to sites like the Utah Field House of Natural History State Park Museum in Vernal. Agriculture remains a foundational pillar, with local farms contributing to the region's food supply and economy. Additionally, the stunning landscapes offer abundant opportunities for outdoor recreation, attracting adventurers and nature enthusiasts alike, further diversifying the local business landscape.\n\nUBC Unlimited is uniquely positioned to support the diverse businesses thriving across Uintah County, from the bustling operations in Vernal to the smaller communities of Naples and Jensen. For the energy sector, we provide secure and efficient payment processing solutions tailored to large-scale transactions and complex billing needs. Tourism-focused businesses, including museums, outfitters, and hospitality providers, benefit from our flexible point-of-sale systems and mobile payment options that cater to a transient customer base. Agricultural enterprises can streamline their sales with our reliable transaction services, while outdoor recreation businesses can leverage our technology for seamless bookings and on-the-go payments. Our comprehensive suite of merchant services is designed to enhance operational efficiency and profitability for every business, regardless of its size or industry.\n\nAs a local Utah company, UBC Unlimited understands the unique economic rhythms and community values of Uintah County. We are committed to fostering local business growth by providing personalized support and cutting-edge payment solutions that are both reliable and affordable. Our dedicated team offers unparalleled customer service, ensuring that businesses in Vernal, Naples, Jensen, and beyond receive the attention and expertise they deserve. Partner with UBC Unlimited to empower your Uintah County business with the tools it needs to succeed in today's competitive market, backed by a team that truly cares about your local success.", keyIndustries: ["Oil and Gas", "Tourism", "Agriculture", "Outdoor Recreation", "Retail"], cities: ["Vernal", "Naples", "Jensen"], stats: [{ label: "Population", value: "36,323" }, { label: "County Seat", value: "Vernal" }, { label: "Known For", value: "Oil & Gas, Dinosaur Tourism" }, { label: "Key Corridor", value: "US-40" }] },
  { slug: "sevier", name: "Sevier County", population: 21522, seat: "Richfield", featured: false, tagline: "Merchant Services for Sevier County's Agricultural & Tourism Businesses", description: "Sevier County sits at the heart of central Utah, anchored by Richfield and surrounded by some of the state's most scenic landscapes. The local economy is driven by agriculture, tourism along I-70, and small-town retail. Businesses here need payment solutions that work reliably — whether you're running a farm supply store, a roadside diner, or a motel catering to travelers heading to Capitol Reef. UBC Unlimited provides local Utah support, competitive rates, and fast onboarding for every business in Sevier County.", keyIndustries: ["Agriculture & Farm Supply", "Restaurants & Diners", "Lodging & Motels", "Retail", "Auto Services"], cities: ["Richfield", "Salina", "Monroe"], stats: [{label:"Population",value:"21K+"},{label:"County Seat",value:"Richfield"},{label:"Avg Savings",value:"Up to 40%"},{label:"Setup Time",value:"24–48 hrs"}] },
  { slug: "duchesne", name: "Duchesne County", population: 20219, seat: "Duchesne", featured: false, tagline: "Merchant Services for Duchesne County's Energy, Ranching, and Recreation Businesses", description: "Duchesne County, nestled within Utah's expansive Uinta Basin, is a region characterized by its rugged natural beauty and a robust economy driven by several key sectors. With a population of 20,219, its primary communities include Roosevelt, Duchesne (the county seat), and Myton. The county's economic backbone is firmly rooted in oil and gas production, leveraging the rich natural resources of the Uinta Basin. Complementing this industrial strength is a vibrant agricultural sector, particularly ranching, which thrives on the county's vast landscapes. Furthermore, Duchesne County is a popular destination for outdoor recreation, attracting visitors and supporting local businesses tied to tourism, hunting, fishing, and other leisure activities. This unique blend of energy, agriculture, and recreation creates a diverse and dynamic business environment.\n\nUBC Unlimited is uniquely positioned to serve the varied business landscape of Duchesne County with tailored merchant services solutions. For the critical oil and gas industry, we provide robust payment processing systems capable of handling large B2B transactions and ensuring secure, efficient financial operations. Agricultural businesses, especially those in ranching, benefit from our mobile payment solutions, ideal for transactions in remote locations or at livestock auctions and farmers' markets. The burgeoning outdoor recreation sector, encompassing outfitters, lodges, and retail shops, can leverage our versatile point-of-sale (POS) systems and e-commerce platforms to manage bookings, sales, and customer interactions seamlessly. Our goal is to empower every business, from the largest energy producer to the smallest local outfitter, with the tools they need to succeed.\n\nAs a local Utah company, UBC Unlimited understands the specific challenges and opportunities within Duchesne County. We are committed to providing personalized, local support that goes beyond generic solutions, ensuring your business receives the attention and expertise it deserves. Our dedicated team is always available to assist with setup, troubleshooting, and optimizing your payment systems, allowing you to focus on what you do best – running your business. Partner with UBC Unlimited today to discover how our innovative and reliable merchant services can help your Duchesne County enterprise thrive in Utah's Uinta Basin.", keyIndustries: ["Oil and Gas", "Agriculture", "Ranching", "Outdoor Recreation", "Retail"], cities: ["Roosevelt", "Duchesne", "Myton"], stats: [{ label: "Population", value: "20,219" }, { label: "County Seat", value: "Duchesne" }, { label: "Known For", value: "Oil and Gas Production, Agriculture, Outdoor Recreation" }, { label: "Key Economic Driver", value: "Uinta Basin Energy" }] },
  { slug: "carbon", name: "Carbon County", population: 20463, seat: "Price", featured: false, tagline: "Merchant Services for Carbon County's Energy, Tourism, and Retail Businesses", description: "Carbon County, nestled in the picturesque landscape of central Utah, boasts a rich history deeply intertwined with its natural resources. Historically, the county's economy has been anchored by its significant coal mining operations, which shaped its development and community identity. Today, while coal mining remains a vital component, the region has diversified, with a strong presence in the broader energy industry. Furthermore, Carbon County is a gateway to the stunning \"Castle Country,\" attracting tourists with its unique geological formations and outdoor recreational opportunities. The presence of the College of Eastern Utah also contributes significantly to the local economy, fostering education and providing a skilled workforce. This blend of traditional industry, emerging energy sectors, and a growing tourism appeal defines Carbon County's dynamic economic environment.\n\nUBC Unlimited is uniquely positioned to support the diverse business landscape of Carbon County. For the energy and mining sectors, we offer robust payment processing solutions capable of handling large-volume transactions and specialized B2B payments, ensuring efficiency and security. Tourism-focused businesses, from hotels and restaurants in Price and Helper to outdoor adventure outfitters, benefit from our versatile point-of-sale systems, mobile payment options, and e-commerce integrations that cater to a transient customer base. Additionally, local retail establishments and educational institutions like the College of Eastern Utah can leverage our tailored merchant accounts, competitive rates, and advanced fraud protection to streamline operations and enhance customer experience. We understand the specific needs of each industry, providing customized solutions that drive growth and profitability.\n\nAs a local Utah company, UBC Unlimited is deeply committed to the success of businesses across the state, including those in Carbon County. We pride ourselves on offering personalized, responsive support that larger, out-of-state providers simply cannot match. Our team is readily available to assist with setup, troubleshooting, and ongoing optimization, ensuring your payment systems run smoothly. Partner with UBC Unlimited to gain a competitive edge with reliable, secure, and locally supported merchant services designed to meet the unique demands of Carbon County's vibrant economy. Contact us today to discover how we can empower your business.", keyIndustries: ["Coal Mining", "Energy", "Tourism", "Education", "Retail"], cities: ["Price", "Helper", "East Carbon"], stats: [{ label: "Population", value: "20,463" }, { label: "County Seat", value: "Price" }, { label: "Known For", value: "Coal Mining History, Energy Industry, Castle Country Tourism, College of Eastern Utah" }, { label: "Major Economic Driver", value: "Energy Production" }] },
  { slug: "millard", name: "Millard County", population: 12990, seat: "Fillmore", featured: false, tagline: "Empowering Millard County businesses with tailored merchant services and local support.", description: "Millard County, nestled in west-central Utah, is a region defined by its vast agricultural landscapes and significant industrial contributions. Known as a major producer of alfalfa and grain, the county's economy is deeply rooted in farming, supporting a network of related businesses from suppliers to distributors. Beyond agriculture, Millard County is home to the Intermountain Power Project, a substantial energy generation facility that plays a crucial role in the regional power grid and provides numerous employment opportunities. The unique geological formations, particularly Topaz Mountain, also attract enthusiasts for gem hunting, contributing to a niche tourism sector and local retail. This blend of traditional agriculture, heavy industry, and emerging tourism creates a diverse economic environment.\n\nUBC Unlimited is uniquely positioned to support the varied business landscape of Millard County with comprehensive merchant services. For agricultural enterprises, we offer robust payment solutions that streamline transactions for farm stands, equipment sales, and wholesale operations, ensuring efficient cash flow. Businesses connected to the Intermountain Power Project can benefit from our secure B2B payment processing, simplifying large-scale transactions and vendor management. Furthermore, the growing tourism and retail sectors, particularly those catering to gem hunters and local visitors, will find our point-of-sale systems and e-commerce integrations invaluable for enhancing customer experience and expanding their reach.\n\nAs a local Utah company, UBC Unlimited understands the specific needs and challenges faced by businesses in communities like Millard County. We are committed to providing personalized support and reliable technology that helps local entrepreneurs thrive. Our dedicated team is always available to offer expert guidance, ensuring your payment processing is seamless and secure, allowing you to focus on what you do best. Partner with UBC Unlimited today and experience the difference of local expertise and unparalleled service for your Millard County business.", keyIndustries: ["Agriculture", "Energy", "Retail", "Tourism", "Logistics"], cities: ["Delta", "Fillmore", "Holden"], stats: [{ label: "Population", value: "12,990" }, { label: "County Seat", value: "Fillmore" }, { label: "Known For", value: "Agriculture, Gem Hunting, Intermountain Power Project" }, { label: "Key Economic Driver", value: "Intermountain Power Project" }] },
  {
    slug: "emery",
    name: "Emery County",
    population: 10086,
    seat: "Castle Dale",
    featured: false,
    tagline: "Castle Country Commerce — Merchant Services for Emery County Businesses",
    description:
      "Emery County is part of Utah's Castle Country region, a high-desert landscape known for its energy industry, outdoor recreation, and small agricultural communities. The county's economy has historically centered on coal mining and power generation, but a growing outdoor tourism sector — anchored by San Rafael Swell and Goblin Valley State Park — is bringing new visitors and new business opportunities to communities like Castle Dale, Huntington, and Ferron.\n\nUBC Unlimited provides Emery County businesses with the full range of merchant services they need to compete in today's payment landscape. Whether you operate a gas station, a local restaurant, a tourism-related retail shop, or a service business, we offer competitive processing rates with no hidden fees and no long-term contracts. Our cash discount and dual pricing programs are particularly well-suited for high-volume, lower-margin businesses like fuel retailers and convenience stores.\n\nFor businesses serving the outdoor recreation market, our mobile payment solutions allow you to accept cards anywhere — at trailheads, at outdoor events, or on guided tours — without a fixed terminal. We also offer virtual terminals for phone orders and invoicing for service businesses that bill after the job is complete.\n\nUBC Unlimited's local Utah team understands the unique challenges of doing business in rural Utah. We provide the same competitive rates and technology as larger processors, with the personal service that only a local partner can offer. Contact us for a free statement review.",
    keyIndustries: ["Energy & Utilities", "Outdoor Recreation & Tourism", "Retail & Convenience", "Food Service", "Agriculture"],
    cities: ["Ferron", "Castle Dale", "Huntington"],
    stats: [
      { label: "Population", value: "10,086" },
      { label: "County Seat", value: "Castle Dale" },
      { label: "Known For", value: "San Rafael Swell" },
      { label: "Region", value: "Castle Country" },
    ],
  },
  { slug: "kane", name: "Kane County", population: 7886, seat: "Kanab", featured: false, tagline: "Empowering Kane County businesses with seamless merchant services solutions.", description: "Kane County, nestled in the scenic southern reaches of Utah, is a region defined by its stunning natural landscapes and a vibrant economy deeply rooted in tourism and outdoor recreation. With its county seat in Kanab, often dubbed \"Little Hollywood\" for its rich history in film and television production, the area attracts visitors drawn to its unique blend of cinematic heritage and breathtaking wilderness. The county serves as a gateway to world-renowned national parks like Bryce Canyon and Zion, making it a prime destination for adventurers and nature enthusiasts. This geographical advantage fuels a robust tourism sector, encompassing hospitality, guided tours, and retail services catering to travelers. Beyond tourism, the county's economy also benefits from creative industries linked to its film legacy and a growing demand for local services in its communities like Big Water and Orderville.\n\nUBC Unlimited is uniquely positioned to support the diverse business landscape of Kane County, offering tailored merchant services that address the specific needs of its key industries. For the bustling tourism sector, we provide advanced point-of-sale systems and mobile payment solutions crucial for hotels, tour operators, and retail shops serving a transient customer base. Our secure and efficient payment processing ensures smooth transactions, whether at a remote trailhead outfitter or a busy Kanab restaurant. Businesses involved in film production can benefit from flexible payment options for vendors and crew, while local service providers in cities like Big Water and Orderville can leverage our integrated solutions to streamline operations and enhance customer experience. We understand the seasonal fluctuations and unique operational demands faced by Kane County businesses, delivering reliable technology and personalized support to help them thrive.\n\nAs a local Utah company, UBC Unlimited is deeply committed to the success of businesses across the state, including those in Kane County. We pride ourselves on offering more than just payment processing; we provide a partnership built on understanding local market dynamics and delivering responsive, accessible support. Our team is readily available to assist with setup, troubleshooting, and strategic advice, ensuring that your merchant services are always optimized for your business needs. Partner with UBC Unlimited today to experience the difference of local expertise and dedicated service, empowering your Kane County business to reach its full potential.", keyIndustries: ["Tourism", "Hospitality", "Film Production", "Retail", "Outdoor Recreation"], cities: ["Kanab", "Big Water", "Orderville"], stats: [{ label: "Population", value: "7,886" }, { label: "County Seat", value: "Kanab" }, { label: "Known For", value: "Film/TV Production & Outdoor Tourism" }, { label: "Business Fact", value: "Gateway to Bryce Canyon & Zion National Parks" }] },
  { slug: "beaver", name: "Beaver County", population: 6710, seat: "Beaver", featured: false, tagline: "Merchant Services for Beaver County's Ranching, Tourism, and Energy Businesses", description: "Beaver County, nestled in southwestern Utah, presents a unique economic landscape shaped by its natural resources and strategic location. With its county seat in Beaver and other key communities like Milford and Minersville, the region is characterized by vast ranchlands, significant geothermal energy potential, and a charming historic downtown in Beaver city that draws visitors. The I-15 corridor, a major transportation artery, further enhances the county's economic activity by facilitating travel services and connecting local businesses to broader markets. These elements combine to create a diverse yet interconnected economy, where traditional sectors like agriculture thrive alongside emerging industries such as renewable energy and a growing tourism sector.\n\nUBC Unlimited is uniquely positioned to empower Beaver County businesses with tailored merchant services that address their specific needs. For the robust ranching and agricultural sector, we offer mobile payment solutions and secure transaction processing that can operate efficiently even in remote areas, ensuring seamless sales whether at the farm gate or local markets. Businesses along the I-15 corridor, including hotels, restaurants, and gas stations, can benefit from our high-speed, reliable payment terminals and integrated point-of-sale systems designed to handle high transaction volumes and diverse payment methods from travelers. Furthermore, as the geothermal energy sector expands, UBC Unlimited provides secure and scalable payment processing for B2B transactions and utility services, supporting the county's innovative energy initiatives. Our solutions are crafted to enhance operational efficiency, reduce costs, and provide a smooth customer experience across all these vital industries.\n\nChoosing UBC Unlimited means partnering with a company deeply rooted in Utah, understanding the local economic nuances and community values that drive Beaver County. We pride ourselves on offering personalized support, ensuring that every business, from a small family ranch to a growing energy enterprise, receives the attention and expertise it deserves. Our dedicated local team is always available to provide assistance, troubleshoot issues, and help you navigate the complexities of payment processing, allowing you to focus on what you do best. Contact UBC Unlimited today to discover how our innovative merchant services can help your Beaver County business thrive and grow in this dynamic Utah landscape.", keyIndustries: ["Agriculture", "Tourism", "Hospitality", "Energy", "Retail"], cities: ["Beaver", "Milford", "Minersville"], stats: [{ label: "Population", value: "6,710" }, { label: "County Seat", value: "Beaver" }, { label: "Known For", value: "Historic Downtown, I-15 Travel, Geothermal Energy, Ranching" }, { label: "Key Corridor", value: "I-15" }] },
  { slug: "grand", name: "Grand County", population: 9754, seat: "Moab", featured: false, tagline: "Merchant Services for Grand County's Thriving Adventure Tourism and Outdoor Recreation Businesses", description: "Grand County, nestled in eastern Utah, is a region defined by its dramatic red rock landscapes and the Colorado River. Its economy is overwhelmingly driven by tourism and outdoor recreation, drawing visitors from across the globe to iconic destinations like Arches and Canyonlands National Parks. The county seat, Moab, serves as a vibrant hub for adventure enthusiasts, offering world-class mountain biking, hiking, rafting, and off-roading opportunities. This unique geography fosters a robust ecosystem of related businesses, including hospitality, retail, guide services, and equipment rentals, all catering to the influx of tourists seeking unparalleled outdoor experiences. The seasonal nature of tourism significantly influences the local business cycle, necessitating flexible and efficient operational solutions.\n\nUBC Unlimited is uniquely positioned to support Grand County's diverse tourism-dependent businesses with tailored merchant services. For the bustling hotels, motels, and vacation rentals in Moab and Castle Valley, we provide seamless payment processing solutions that handle high volumes of transactions, including online bookings and contactless payments, crucial for a transient customer base. Outdoor adventure companies, from mountain bike outfitters to rafting guides, benefit from our mobile payment options, allowing them to process payments securely even in remote locations. Retail shops and restaurants catering to tourists can leverage our integrated POS systems for efficient service, while our robust security features protect sensitive customer data, ensuring peace of mind for both merchants and visitors.\n\nAs a local Utah company, UBC Unlimited understands the specific challenges and opportunities within Grand County's economy. Our commitment extends beyond just providing technology; we offer personalized support from a team deeply familiar with the regional business landscape. This local expertise means faster, more responsive service and solutions that truly resonate with the needs of Moab's entrepreneurs. Partner with UBC Unlimited to optimize your payment processing, enhance customer experiences, and grow your business in Grand County. Contact us today to discover how our dedicated merchant services can empower your enterprise amidst Utah's breathtaking natural wonders.", keyIndustries: ["Tourism", "Outdoor Recreation", "Hospitality", "Retail", "Guide Services"], cities: ["Moab", "Castle Valley"], stats: [{ label: "Population", value: "9,754" }, { label: "County Seat", value: "Moab" }, { label: "Known For", value: "World-class mountain biking and outdoor recreation, Arches and Canyonlands National Parks" }, { label: "Key Economic Driver", value: "Adventure Tourism" }] },
  { slug: "san-juan", name: "San Juan County", population: 15308, seat: "Monticello", featured: false, tagline: "Merchant Services for San Juan County's Tourism and Local Businesses", description: "San Juan County, nestled in the southeastern corner of Utah, is defined by its breathtaking, rugged landscapes, encompassing world-renowned natural wonders such as Monument Valley and the Bears Ears National Monument. The county's economy is intrinsically linked to its unique geography, with outdoor and cultural tourism serving as primary drivers. A significant portion of the Navajo Nation resides within its borders, contributing to a vibrant cultural heritage and a diverse local commercial environment. Key industries thriving here include tourism, hospitality, retail, and various services that cater to the steady stream of visitors drawn to the region's unparalleled scenic beauty and rich historical sites. The remote yet captivating nature of San Juan County fosters a strong sense of community and reliance on local businesses.\n\nUBC Unlimited is exceptionally well-equipped to address the varied business requirements across San Juan County. For the dynamic tourism sector, we deliver robust payment processing solutions specifically designed for accommodations, tour operators, and gift shops, guaranteeing smooth and secure transactions for every visitor. Our comprehensive services extend to local retail establishments in communities like Blanding, Monticello, and Moab, offering efficient and reliable point-of-sale systems that serve both residents and the many tourists. We recognize the critical importance of dependable payment infrastructure, especially in more remote areas, and provide solutions that significantly enhance operational efficiency and customer satisfaction, whether for a small, family-owned enterprise or a larger business supporting the region's national treasures.\n\nAs a proud local Utah company, UBC Unlimited is deeply invested in the economic vitality of communities throughout the state, including San Juan County. We offer personalized support and a profound understanding of the regional economic nuances, ensuring that businesses receive tailored merchant services that precisely align with their operational needs. Our dedicated team is always on hand to provide responsive assistance, delivering the local expertise and attentive service that larger, more impersonal providers simply cannot match. Partner with UBC Unlimited today to empower your San Juan County business with state-of-the-art payment solutions and experience the tangible benefits of truly local support.", keyIndustries: ["Tourism", "Hospitality", "Retail", "Cultural Services", "Outdoor Recreation"], cities: ["Blanding", "Monticello", "Moab"], stats: [{ label: "Population", value: "15,308" }, { label: "County Seat", value: "Monticello" }, { label: "Known For", value: "Bears Ears National Monument, Monument Valley" }, { label: "Business Fact", value: "Outdoor/Cultural Tourism Hub" }] },
  {
    slug: "garfield",
    name: "Garfield County",
    population: 5051,
    seat: "Panguitch",
    featured: false,
    tagline: "Utah's Grand Staircase Gateway — Merchant Services for Garfield County Businesses",
    description:
      "Garfield County is one of Utah's most geographically spectacular counties, encompassing Bryce Canyon National Park, portions of Grand Staircase-Escalante National Monument, and the scenic communities of Panguitch, Escalante, and Boulder. Tourism is the dominant economic driver, with millions of visitors passing through annually on their way to world-class hiking, photography, and outdoor adventure.\n\nFor Garfield County business owners — whether you run a motel in Panguitch, a gear shop in Escalante, a restaurant near Bryce Canyon, or a guided tour operation — UBC Unlimited provides the merchant services infrastructure to capture every sale efficiently and affordably. We offer competitive credit card processing rates, mobile payment solutions for outdoor and field-based businesses, and e-commerce payment gateways for businesses selling tours, lodging, or merchandise online.\n\nSeasonal volume swings are a reality for Garfield County businesses, and our pricing models are designed to accommodate them. We don't penalize you for low-volume months with high minimum fees, and we don't lock you into multi-year contracts. Our cash discount and dual pricing programs help offset processing costs during peak season when transaction volume is highest.\n\nWith a local Utah rep who understands the rural and tourism-driven nature of Garfield County's economy, UBC Unlimited is the payment processing partner built for businesses in Utah's canyon country. Contact us for a free, no-obligation statement review.",
    keyIndustries: ["Tourism & Hospitality", "Outdoor Recreation", "Retail", "Food Service", "Guided Tours & Adventures"],
    cities: ["Panguitch", "Escalante", "Boulder"],
    stats: [
      { label: "Population", value: "5,051" },
      { label: "County Seat", value: "Panguitch" },
      { label: "Top Attraction", value: "Bryce Canyon National Park" },
      { label: "Region", value: "Grand Staircase Country" },
    ],
  },
  { slug: "wayne", name: "Wayne County", population: 2778, seat: "Loa", featured: false, tagline: "Empowering Wayne County Businesses with Tailored Merchant Services and Local Support.", description: "Wayne County, nestled in south-central Utah, is a region defined by its stunning natural beauty and a resilient rural economy. With its county seat in Loa and charming communities like Torrey and Bicknell, the area serves as a gateway to iconic landscapes such as Capitol Reef National Park and the breathtaking scenic Highway 12. The economy is primarily driven by tourism, attracting visitors eager to explore national parks, scenic byways, and outdoor recreational opportunities. Complementing this, small-scale ranching and agriculture form the traditional backbone of the local economy, providing essential goods and maintaining the county's pastoral character. The unique blend of natural attractions and agricultural heritage creates a distinct business environment.\n\nUBC Unlimited understands the unique operational needs of businesses in Wayne County, from the bustling tourist-oriented shops and lodging establishments in Torrey to the family-run ranches and local service providers in Loa and Bicknell. We offer tailored merchant services designed to streamline payment processing, enhance customer experience, and boost efficiency. For tourism-related businesses, our mobile payment solutions and e-commerce platforms ensure seamless transactions for visitors, whether they're booking tours or purchasing souvenirs. Agricultural businesses can benefit from secure, reliable payment systems that adapt to their specific sales cycles and operational demands, including invoicing and recurring payments. Our solutions are built to support the diverse economic activities that thrive amidst Wayne County's rural charm.\n\nAs a local Utah company, UBC Unlimited is deeply committed to the success of businesses across the state, including those in Wayne County. We pride ourselves on providing personalized, responsive support that understands the specific challenges and opportunities faced by rural enterprises. Our dedicated team is always ready to assist, ensuring your payment systems run smoothly so you can focus on what you do best. Partner with UBC Unlimited to experience the difference of local expertise and cutting-edge merchant services designed for Wayne County's unique business landscape.", keyIndustries: ["Tourism", "Ranching", "Agriculture", "Retail", "Hospitality"], cities: ["Loa", "Torrey", "Bicknell"], stats: [{ label: "Population", value: "2,778" }, { label: "County Seat", value: "Loa" }, { label: "Known For", value: "Capitol Reef National Park, Scenic Highway 12" }, { label: "Business Fact", value: "Rural tourism is a key economic driver" }] },
  { slug: "piute", name: "Piute County", population: 1476, seat: "Junction", featured: false, tagline: "Merchant Services for Piute County's Tourism, Recreation, and Agricultural Businesses", description: "Piute County, nestled in the heart of Utah, is a region defined by its stunning natural beauty and a close-knit community. As one of Utah's least populated counties, with its seat in Junction and the vibrant town of Marysvale, it offers a unique blend of serene landscapes and outdoor adventure. The economy here is primarily driven by its robust tourism sector, drawing visitors to the picturesque Marysvale Canyon and extensive ATV recreation trails that crisscross the rugged terrain. Complementing this, small agricultural operations form a foundational part of the local economy, alongside a growing demand for retail and hospitality services that cater to both residents and the influx of tourists. This unique economic tapestry, characterized by its rural charm and reliance on natural assets, creates a distinct business environment where personalized service and community connection are paramount.\n\nUBC Unlimited is uniquely positioned to empower Piute County businesses with tailored merchant services that resonate with their specific needs. For the bustling tourism and outdoor recreation industries, we offer mobile payment solutions and robust e-commerce platforms, enabling seamless transactions for ATV rentals, lodging, and local attractions. Agricultural businesses can benefit from our flexible payment processing systems, designed to handle transactions both in-store and on-site, supporting the sale of local produce and goods. Furthermore, our point-of-sale systems are ideal for the county's retail shops and hospitality venues, ensuring efficient operations and enhanced customer experiences. We understand that businesses in Junction, Marysvale, and across Piute County thrive on reliability and efficiency, which is precisely what our cutting-edge payment technologies deliver.\n\nAs a local Utah company, UBC Unlimited is deeply committed to the success of businesses throughout the state, including the vital enterprises of Piute County. We pride ourselves on providing unparalleled local support, ensuring that our clients receive prompt, personalized assistance whenever they need it. Our team is dedicated to understanding the nuances of your business and offering solutions that not only streamline your payment processes but also contribute to your growth within this unique economic landscape. Partner with UBC Unlimited today to experience the difference that local expertise, reliable technology, and a genuine commitment to your success can make for your Piute County business.", keyIndustries: ["Tourism", "Outdoor Recreation", "Agriculture", "Retail", "Hospitality"], cities: ["Junction", "Marysvale"], stats: [{ label: "Population", value: "1,476" }, { label: "County Seat", value: "Junction" }, { label: "Known For", value: "Marysvale Canyon, ATV Recreation, Agriculture" }, { label: "Key Business Trait", value: "Community-Oriented Commerce" }] },
  {
    slug: "rich",
    name: "Rich County",
    population: 2479,
    seat: "Randolph",
    featured: false,
    tagline: "Bear Lake Country — Merchant Services for Rich County Businesses",
    description:
      "Rich County is Utah's northeastern corner, a sparsely populated but scenically rich region anchored by Bear Lake — the 'Caribbean of the Rockies' — and the small communities of Randolph and Garden City. Despite its small permanent population, Rich County draws significant seasonal tourism traffic, with Bear Lake attracting boaters, swimmers, and outdoor enthusiasts from across the Intermountain West during summer months.\n\nFor Rich County business owners, the challenge is capturing peak-season revenue efficiently while managing costs during the quieter months. UBC Unlimited provides merchant services solutions designed for exactly this kind of seasonal business cycle. We offer competitive processing rates with no monthly minimums that penalize you during off-peak periods, and mobile payment solutions that let you accept cards at the marina, at outdoor events, or anywhere customers find you during the busy season.\n\nGarden City's Bear Lake Boulevard is lined with restaurants, rental shops, and retail businesses that depend on reliable, fast payment processing during the summer rush. UBC Unlimited ensures your terminals and payment systems are ready for high-volume days and that funds are deposited quickly — typically next business day — so your cash flow stays healthy throughout the season.\n\nOur local Utah team provides the personal service that national processors can't match. We're a phone call away when you need support, and we handle setup, training, and equipment so you can focus on your customers. Contact us for a free statement review.",
    keyIndustries: ["Tourism & Recreation", "Food Service & Restaurants", "Retail & Rentals", "Lodging & Hospitality", "Agriculture"],
    cities: ["Randolph", "Garden City"],
    stats: [
      { label: "Population", value: "2,479" },
      { label: "County Seat", value: "Randolph" },
      { label: "Top Attraction", value: "Bear Lake" },
      { label: "Known As", value: "Caribbean of the Rockies" },
    ],
  },
  { slug: "morgan", name: "Morgan County", population: 12124, seat: "Morgan", featured: false, tagline: "Empowering Morgan County Businesses with Seamless Payment Processing Solutions", description: "Morgan County, nestled amidst the picturesque Morgan Valley and framed by the Wasatch Mountains, presents a unique economic landscape characterized by its agricultural roots, scenic beauty, and strategic location along the I-84 corridor. With its county seat in Morgan and the small community of Croydon, the area maintains a close-knit community feel while benefiting from its proximity to larger metropolitan centers like Ogden and Salt Lake City. Agriculture, particularly ranching and farming, remains a cornerstone of the local economy, complemented by a growing tourism sector drawn to the valley's natural attractions and recreational opportunities. The I-84 corridor also supports various local businesses, including transportation services, hospitality, and retail, catering to both residents and travelers passing through.\n\nUBC Unlimited is uniquely positioned to support the diverse businesses thriving in Morgan County. For agricultural enterprises, we offer robust mobile payment solutions, enabling transactions at farmers' markets or on-site equipment sales, ensuring efficiency and security. Hospitality and tourism businesses, from quaint bed and breakfasts to outdoor adventure outfitters, can leverage our integrated point-of-sale (POS) systems and online booking capabilities to streamline operations and enhance customer experience. Local retail and service providers benefit from our secure credit card processing, e-commerce platforms, and customer loyalty programs, all designed to foster growth and adapt to evolving consumer demands. Our solutions are tailored to meet the specific needs of Morgan County's unique business environment, ensuring reliable and efficient payment processing.\n\nAs a local Utah company, UBC Unlimited deeply understands the nuances of doing business in communities like Morgan County. We pride ourselves on providing personalized, dedicated support that goes beyond just processing payments; we aim to be a true partner in your success. Our team is committed to offering local expertise and responsive service, ensuring your business has the tools it needs to thrive in this vibrant region. Contact UBC Unlimited today to discover how our merchant services can empower your Morgan County business with secure, efficient, and locally-supported payment solutions.", keyIndustries: ["Agriculture", "Tourism", "Retail", "Transportation", "Local Services"], cities: ["Morgan", "Croydon"], stats: [{ label: "Population", value: "12,124" }, { label: "County Seat", value: "Morgan" }, { label: "Known For", value: "Scenic Beauty & Agriculture" }, { label: "Key Corridor", value: "I-84" }] },
  { slug: "wasatch", name: "Wasatch County", population: 34788, seat: "Heber City", featured: false, tagline: "Payment Processing for Wasatch County's Resort & Recreation Economy", description: "Wasatch County is one of Utah's fastest-growing areas, anchored by Heber City and the resort community of Midway. The county attracts outdoor enthusiasts, skiers, and families year-round, supporting a thriving mix of restaurants, boutique shops, vacation rentals, and recreational outfitters. UBC Unlimited helps Wasatch County businesses accept payments efficiently — with local support, transparent pricing, and solutions that scale with your seasonal volume.", keyIndustries: ["Restaurants & Cafes", "Outdoor Recreation", "Vacation Rentals", "Boutique Retail", "Lodging"], cities: ["Heber City", "Midway", "Wallsburg"], stats: [{label:"Population",value:"35K+"},{label:"County Seat",value:"Heber City"},{label:"Avg Savings",value:"Up to 40%"},{label:"Setup Time",value:"24–48 hrs"}] },
  { slug: "juab", name: "Juab County", population: 11918, seat: "Nephi", featured: false, tagline: "Empowering Juab County Businesses with Seamless Merchant Services and Local Support", description: "Juab County, nestled in the heart of Utah, serves as a vital economic bridge between the bustling Salt Lake metropolitan area and the state's southern regions. Its economy is significantly shaped by its strategic location along the I-15 corridor, fostering commerce and logistics. Beyond its transportation advantages, the county boasts a rich agricultural heritage, with farming and ranching forming a foundational pillar of its local economy. The unique geological formations, such as Topaz Mountain, also contribute to a burgeoning interest in outdoor recreation and tourism, drawing visitors for rockhounding and scenic beauty. These diverse elements create a dynamic business landscape, from traditional agricultural enterprises to modern service providers catering to travelers and residents alike.\n\nUBC Unlimited is uniquely positioned to support the varied business needs across Juab County, from the agricultural producers in Levan to the retail establishments in Nephi and Mona benefiting from I-15 corridor traffic. We offer tailored merchant services solutions designed to streamline payment processing, enhance customer experience, and boost operational efficiency. For agricultural businesses, our mobile payment options and robust POS systems can facilitate transactions in the field or at farmers' markets. Retailers and hospitality providers along the I-15 corridor can leverage our integrated e-commerce platforms and secure card readers to capture sales from both local patrons and passing tourists. Our services are built to adapt to the specific demands of Juab County's key industries, ensuring businesses can thrive in a competitive environment.\n\nAs a local Utah company, UBC Unlimited understands the distinct challenges and opportunities faced by businesses in communities like Juab County. Our commitment extends beyond providing cutting-edge payment technology; we offer personalized support from a team deeply familiar with the Utah business landscape. We pride ourselves on delivering reliable, accessible service that helps local enterprises grow and prosper. Partner with UBC Unlimited today to experience the difference of dedicated local support and innovative merchant solutions designed to empower your Juab County business for sustained success. Contact us to discover how we can customize a payment processing strategy that aligns perfectly with your operational goals.", keyIndustries: ["Agriculture", "Retail", "Tourism", "Logistics", "Mining"], cities: ["Nephi", "Mona", "Levan"], stats: [{ label: "Population", value: "11,918" }, { label: "County Seat", value: "Nephi" }, { label: "Known For", value: "I-15 Corridor Commerce & Topaz Mountain" }, { label: "Major Cities", value: "Nephi, Mona, Levan" }] },
  { slug: "daggett", name: "Daggett County", population: 1160, seat: "Manila", featured: false, tagline: "Merchant Services for Daggett County — Flaming Gorge's Business Community", description: "Daggett County is Utah's least populous county, but its businesses serve thousands of visitors each year who come to fish, boat, and camp at Flaming Gorge Reservoir. Local businesses — from bait shops and marinas to small motels and convenience stores — need payment processing that works reliably in a remote setting. UBC Unlimited provides dependable merchant services with local Utah support, competitive rates, and equipment that works wherever your business operates.", keyIndustries: ["Outdoor Recreation & Marinas", "Convenience & Fuel", "Lodging", "Restaurants", "Guide Services"], cities: ["Manila", "Dutch John"], stats: [{label:"Population",value:"1,160"},{label:"County Seat",value:"Manila"},{label:"Avg Savings",value:"Up to 40%"},{label:"Setup Time",value:"24–48 hrs"}] },
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
  { slug: "kearns", name: "Kearns", county: "salt-lake", population: 35731, featured: false, tagline: "Merchant Services for Kearns, Utah — Local Payment Processing Support", description: "Kearns is a vibrant unincorporated community in Salt Lake County with over 35,000 residents and a diverse mix of small businesses, restaurants, and retail shops. Located just west of Salt Lake City, Kearns businesses benefit from a dense local customer base and easy access to the broader Wasatch Front market. UBC Unlimited provides Kearns business owners with competitive payment processing rates, local Utah support, and fast onboarding — so you can focus on serving your community.", keyIndustries: ["Restaurants & Food Service", "Retail", "Auto Services", "Healthcare", "Personal Services"] },
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
