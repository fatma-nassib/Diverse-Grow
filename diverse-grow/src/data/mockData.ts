import type {
  User, Plot, Crop, YieldRecord, ActivityLog,
  Listing, Article, CoopMember, Announcement, CoopDocument, Cooperative,
} from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Ashley Ntaimo',
  role: 'farmer',
  location: 'Lusaka, Zambia',
  cooperative: 'Lusaka Smallholders Cooperative',
  avatar: 'AN',
  joinedAt: '2024-03-01',
};

// ── Farm Data ─────────────────────────────────────────────────────────────────
export const plots: Plot[] = [
  { id: 'p1', name: 'Northern Plot', areaHa: 3.2, soilType: 'Sandy Loam', location: 'Lusaka North' },
  { id: 'p2', name: 'Eastern Plot', areaHa: 1.8, soilType: 'Clay Loam', location: 'Lusaka East' },
  { id: 'p3', name: 'Southern Paddock', areaHa: 2.4, soilType: 'Loam', location: 'Lusaka South' },
];

export const crops: Crop[] = [
  {
    id: 'c1', name: 'Maize', variety: 'ZM523', plotId: 'p1',
    plantedDate: '2025-11-15', expectedHarvestDate: '2026-04-10',
    status: 'flowering', progressPercent: 68,
    areaHa: 3.2, inputCost: 420, notes: 'Good germination rate. Applied NPK fertiliser week 4.',
  },
  {
    id: 'c2', name: 'Soybeans', variety: 'Soprano', plotId: 'p2',
    plantedDate: '2025-12-01', expectedHarvestDate: '2026-03-25',
    status: 'growing', progressPercent: 35,
    areaHa: 1.8, inputCost: 210, notes: 'Nodulation visible. Inoculant applied at planting.',
  },
  {
    id: 'c3', name: 'Sweet Potato', variety: 'Resisto', plotId: 'p3',
    plantedDate: '2025-10-20', expectedHarvestDate: '2026-02-28',
    status: 'harvesting', progressPercent: 90,
    areaHa: 2.4, inputCost: 180, notes: 'Ready for harvest. Storage prepared.',
  },
];

export const yieldHistory: YieldRecord[] = [
  { month: 'Aug', year: 2025, cropName: 'Maize',       yieldTonnes: 4.2, incomeUSD: 378 },
  { month: 'Sep', year: 2025, cropName: 'Soybeans',    yieldTonnes: 2.1, incomeUSD: 252 },
  { month: 'Oct', year: 2025, cropName: 'Groundnuts',  yieldTonnes: 1.8, incomeUSD: 216 },
  { month: 'Nov', year: 2025, cropName: 'Maize',       yieldTonnes: 5.0, incomeUSD: 450 },
  { month: 'Dec', year: 2025, cropName: 'Sweet Potato',yieldTonnes: 6.3, incomeUSD: 378 },
  { month: 'Jan', year: 2026, cropName: 'Maize',       yieldTonnes: 3.8, incomeUSD: 342 },
  { month: 'Feb', year: 2026, cropName: 'Soybeans',    yieldTonnes: 2.9, incomeUSD: 348 },
  { month: 'Mar', year: 2026, cropName: 'Maize',       yieldTonnes: 5.6, incomeUSD: 504 },
];

export const activityLogs: ActivityLog[] = [
  { id: 'a1', cropId:'c1', cropName:'Maize',       date:'2026-03-14', type:'observation',  description:'Checked for fall armyworm. No infestation detected. Leaves healthy.' },
  { id: 'a2', cropId:'c1', cropName:'Maize',       date:'2026-03-10', type:'fertilising',  description:'Applied urea top dressing at tassel emergence.', cost: 45 },
  { id: 'a3', cropId:'c2', cropName:'Soybeans',    date:'2026-03-08', type:'spraying',     description:'Applied fungicide to prevent rust. Mixed 200ml in 20L water.', cost: 22 },
  { id: 'a4', cropId:'c3', cropName:'Sweet Potato',date:'2026-03-05', type:'observation',  description:'Vines mature. Roots sizing well. Harvest target: 20 Mar.' },
  { id: 'a5', cropId:'c1', cropName:'Maize',       date:'2026-03-01', type:'watering',     description:'Supplemental irrigation — 25mm applied due to dry spell.' },
  { id: 'a6', cropId:'c2', cropName:'Soybeans',    date:'2026-02-22', type:'observation',  description:'Pod fill commencing. Stand density good at 95%.' },
];

// ── Marketplace ───────────────────────────────────────────────────────────────
export const listings: Listing[] = [
  {
    id: 'l1', sellerId:'u2', sellerName:'Grace Phiri', sellerCooperative:'Lusaka Smallholders Coop',
    sellerLocation:'Lusaka, Zambia', title:'White Maize — Grade A',
    category:'grains', description:'Sun-dried, machine-shelled white maize. Moisture content <14%. Tested and certified. Available in 50kg bags.',
    pricePerUnit:45, unit:'50kg bag', quantityAvailable:200,
    deliveryOptions:['Pickup','Delivery within 50km'],
    imageColor:'#2C5F2D', status:'active', postedAt:'2026-03-10', expiresAt:'2026-04-10',
  },
  {
    id: 'l2', sellerId:'u3', sellerName:'John Mwale', sellerCooperative:'Copperbelt Farmers Union',
    sellerLocation:'Ndola, Zambia', title:'Fresh Tomatoes — Roma Variety',
    category:'vegetables', description:'Farm-fresh Roma tomatoes. Picked 24hrs ago. Firm, disease-free. Sold per 20kg crate.',
    pricePerUnit:12, unit:'20kg crate', quantityAvailable:80,
    deliveryOptions:['Pickup','Delivery within 30km'],
    imageColor:'#c0392b', status:'active', postedAt:'2026-03-15', expiresAt:'2026-03-25',
  },
  {
    id: 'l3', sellerId:'u4', sellerName:'Fatuma Hassan', sellerCooperative:'Dar es Salaam Coop',
    sellerLocation:'Dar es Salaam, Tanzania', title:'Soybeans — High Protein',
    category:'grains', description:'Non-GMO soybeans, 40% protein content. Suitable for food processing or animal feed. 50kg bags.',
    pricePerUnit:38, unit:'50kg bag', quantityAvailable:120,
    deliveryOptions:['Pickup','Freight available'],
    imageColor:'#028090', status:'active', postedAt:'2026-03-12', expiresAt:'2026-04-12',
  },
  {
    id: 'l4', sellerId:'u5', sellerName:'Mary Tembo', sellerCooperative:'Mwanza Farmers Coop',
    sellerLocation:'Mwanza, Tanzania', title:'Sweet Potato — Resisto Variety',
    category:'vegetables', description:'Orange-fleshed sweet potato, vitamin A rich. Harvested this week. 10kg boxes.',
    pricePerUnit:8, unit:'10kg box', quantityAvailable:60,
    deliveryOptions:['Pickup'],
    imageColor:'#E6A817', status:'active', postedAt:'2026-03-16', expiresAt:'2026-04-05',
  },
  {
    id: 'l5', sellerId:'u6', sellerName:'Peter Banda', sellerCooperative:'Kitwe Smallholders',
    sellerLocation:'Kitwe, Zambia', title:'Groundnuts — Shelled',
    category:'grains', description:'Machine-shelled groundnuts. Aflatoxin-tested, certified clean. 25kg bags.',
    pricePerUnit:30, unit:'25kg bag', quantityAvailable:150,
    deliveryOptions:['Pickup','Delivery within 100km'],
    imageColor:'#97BC62', status:'active', postedAt:'2026-03-13', expiresAt:'2026-04-13',
  },
  {
    id: 'l6', sellerId:'u7', sellerName:'Alice Zulu', sellerCooperative:'Lusaka Smallholders Coop',
    sellerLocation:'Lusaka, Zambia', title:'NPK Fertiliser 10:20:10',
    category:'inputs', description:'Basal fertiliser, 50kg bags. Purchased in bulk, selling surplus at cost. Ideal for maize and legumes.',
    pricePerUnit:55, unit:'50kg bag', quantityAvailable:40,
    deliveryOptions:['Pickup'],
    imageColor:'#4A8C4B', status:'active', postedAt:'2026-03-09', expiresAt:'2026-04-09',
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: 'e1', title:'Improving Soil Health Through Compost and Cover Crops',
    category:'soil', readTimeMin:6, reads:287, author:'Dr. James Mwangi', publishedAt:'2026-02-10',
    tags:['compost','cover crops','organic matter','soil pH'],
    summary:'Learn practical methods to improve soil fertility using locally available organic materials and strategic cover cropping.',
    body:`Healthy soil is the foundation of productive farming. In East and Southern Africa, many smallholder farms face declining soil fertility due to continuous cropping without adequate inputs. This article outlines affordable, practical strategies.

**Composting**
Compost can be made from crop residues, animal manure, kitchen waste, and green leaves. A well-managed compost heap takes 6–8 weeks to mature. Apply 2–4 tonnes per hectare before planting to significantly improve water retention and nutrient availability.

Key steps for effective composting:
- Alternate dry (carbon-rich) and wet (nitrogen-rich) layers
- Keep the heap moist but not waterlogged
- Turn every 2 weeks to accelerate decomposition
- Finished compost is dark, crumbly, and earthy-smelling

**Cover Crops**
Planting leguminous cover crops such as lablab, mucuna, or sunn hemp during the off-season fixes atmospheric nitrogen, suppresses weeds, and adds organic matter when incorporated. A single mucuna season can fix 150–250 kg N/ha.

**Soil pH Management**
Most crops perform best at pH 5.5–6.5. Apply agricultural lime (1–2 t/ha) if your soil is acidic. Contact your local extension officer for a subsidised soil test.

Consistent application of these practices over 2–3 seasons can double organic matter content and significantly reduce fertiliser requirements.`,
  },
  {
    id: 'e2', title:'Integrated Pest Management for Smallholder Farmers',
    category:'pests', readTimeMin:8, reads:194, author:'Agnes Chirwa', publishedAt:'2026-01-28',
    tags:['fall armyworm','IPM','pesticides','scouting'],
    summary:'A systematic approach to managing crop pests that minimises chemical use and protects farm profitability.',
    body:`Integrated Pest Management (IPM) combines biological, cultural, mechanical, and chemical controls to manage pests cost-effectively while minimising environmental impact.

**The Four IPM Pillars**

1. Prevention — Use certified, disease-resistant seed varieties. Practice crop rotation to break pest cycles. Maintain field hygiene by removing crop debris.

2. Monitoring — Scout fields twice weekly from emergence onwards. Walk diagonal transects and inspect 20 plants per hectare. Record pest numbers and severity scores.

3. Economic Thresholds — Only spray when pest populations exceed the economic threshold (ET). For fall armyworm on maize, the ET is 1 infested plant per 5 plants scouted at early vegetative stage.

4. Control Options — Prioritise biological controls (Bt-based biopesticides, push-pull companion planting) before chemical intervention. When chemicals are necessary, use recommended products at label rates and rotate modes of action to prevent resistance.

**Fall Armyworm Management**
The fall armyworm (Spodoptera frugiperda) is the most damaging pest in the region. Early detection is critical — look for feeding damage on whorl leaves and frass. Apply emamectin benzoate or chlorantraniliprole at first sign of infestation, targeting the whorl at dusk when larvae are active.

**Record Keeping**
Maintain a spray diary recording date, product, rate, pest pressure, and weather conditions. This data supports IPM decision-making and satisfies buyer food safety requirements.`,
  },
  {
    id: 'e3', title:'Maximising Maize Yield: A Harvest Timing and Post-Harvest Guide',
    category:'harvest', readTimeMin:5, reads:341, author:'Thomas Banda', publishedAt:'2026-02-20',
    tags:['maize','harvest','storage','aflatoxin','post-harvest losses'],
    summary:'Practical guidance on determining optimal harvest timing, proper drying, and safe storage to protect your maize crop value.',
    body:`Post-harvest losses in Sub-Saharan Africa account for 20–40% of maize production. Proper harvest timing and handling can preserve this value entirely.

**Determining Harvest Readiness**
Harvest maize when grain moisture is 20–25%. Visual indicators include: husks have turned brown and dry, black layer (abscission layer) has formed at the base of each kernel, and grain is hard when pressed with a fingernail. Do not wait for husks to fully dry on the plant as this increases field losses and aflatoxin risk.

**Harvesting Techniques**
Hand harvest by bending stalks at the ear, twisting, and pulling. Dehusk immediately after harvest to allow rapid drying. Never pile unhusked cobs — this traps moisture and promotes mould.

**Drying**
Target moisture content of 12–13% before storage. Drying methods:
- Sun drying on raised platforms (7–14 days depending on weather)
- Never dry directly on bare ground — increases contamination risk
- Use a moisture meter if available; or bite test — a hard click means dry

**Safe Storage**
Use hermetic storage (e.g., PICS bags, metal silos) to prevent insect infestation without chemicals. Hermetic bags are available through cooperatives at subsidised rates. Inspect stored grain monthly.

**Aflatoxin Prevention**
Aflatoxin contamination occurs when maize is stressed, damaged, or improperly stored. Key prevention steps: harvest on time, dry thoroughly, remove damaged kernels, and use hermetic storage.`,
  },
  {
    id: 'e4', title:'Connecting to Buyers: How to Use the DIVERSE GROW Marketplace',
    category:'market', readTimeMin:4, reads:156, author:'DIVERSE GROW Team', publishedAt:'2026-03-01',
    tags:['marketplace','buyers','pricing','negotiation','contracts'],
    summary:'Step-by-step guidance on listing your produce, setting competitive prices, and building reliable buyer relationships.',
    body:`The DIVERSE GROW Marketplace connects you directly with buyers, eliminating exploitative middlemen and giving you control over your selling price.

**Setting Up Your First Listing**
Navigate to Marketplace and select "Post a Listing." Fill in all fields accurately — buyers rely on this information to make purchasing decisions. Be specific about quality, grade, variety, and available quantity.

**Pricing Your Produce**
Research the current market price before posting. Use the "Market Insights" section to see recent transaction prices for your crop category. Set your price competitively but do not undervalue your produce — factor in all input costs plus a reasonable margin.

Formula: Minimum price = (Total input cost ÷ expected yield) × 1.25

**Writing a Strong Description**
Include: variety name, production method (organic/conventional), harvest date, moisture content (for grains), packaging available, and any certifications. Buyers pay premium for transparency.

**Managing Inquiries**
Respond to buyer inquiries within 24 hours. Provide clear answers about delivery options and timelines. For large orders, request a deposit or written agreement before committing stock.

**Building Long-Term Relationships**
Buyers who trust you will return season after season at agreed prices. Deliver what you promised, on time, at the quality stated. One reliable buyer relationship is worth more than many one-off transactions.`,
  },
  {
    id: 'e5', title:'Cooperative Governance: Running an Effective Agricultural Cooperative',
    category:'cooperative', readTimeMin:7, reads:128, author:'IFAD East Africa', publishedAt:'2026-01-15',
    tags:['governance','cooperative','meetings','record keeping','democracy'],
    summary:'Best practices for cooperative leadership, transparent financial management, and member engagement to build a thriving cooperative.',
    body:`Strong cooperatives are built on transparent governance, clear rules, and genuine member participation. This guide covers the essentials.

**Legal Foundation**
Register your cooperative under national cooperative legislation. Obtain a certificate of registration and maintain compliance with annual reporting requirements. Consult your provincial cooperative office for assistance.

**The Governing Committee**
A minimum of five elected officials provides effective oversight: Chairperson, Vice-Chairperson, Secretary, Treasurer, and Members' Representative. Elections should be held annually at the Annual General Meeting (AGM) with all members eligible to vote.

**Financial Management**
Open a cooperative bank account requiring dual signatories (Chairperson and Treasurer). Maintain a cashbook recording all income and expenditure. Engage an external auditor annually — even a simple review builds member confidence.

**Member Records**
Maintain a register of all members including contact details, farm size, products, and share capital contributed. Update quarterly. Members have the right to inspect the register.

**Effective Meetings**
Monthly management committee meetings with agenda, quorum verification, and minutes. Quarterly general meetings open to all members. Distribute minutes within 7 days. Record attendance and decisions.

**Conflict Resolution**
Establish a written complaints procedure. Disputes between members should first be mediated internally before escalating. A clear, fair process prevents fragmentation.

**Building Financial Reserves**
Allocate 10–20% of annual surplus to a statutory reserve fund. These reserves provide resilience during poor seasons and enable investment in collective assets (storage facilities, equipment).`,
  },
  {
    id: 'e6', title:'Drip Irrigation for Smallholder Farmers: A Practical Introduction',
    category:'irrigation', readTimeMin:6, reads:89, author:'FAO Tanzania', publishedAt:'2026-02-05',
    tags:['irrigation','water','drought','dry season','efficiency'],
    summary:'How to implement affordable drip irrigation systems to extend your growing season and improve yields during dry periods.',
    body:`Water scarcity is a growing challenge for smallholder farmers across East Africa. Drip irrigation delivers water directly to the root zone, reducing consumption by 30–60% compared to flood irrigation.

**Basic System Components**
A simple drip system requires: water source (tank, well, or tap), main supply pipe, sub-main pipes, drip laterals, and emitters. Gravity-fed systems eliminate the need for pumps — a 1,000-litre tank elevated 1.5 metres provides adequate pressure.

**Installation Steps**
1. Map your field and plan pipe layout along crop rows
2. Install the main line from the water source to the field
3. Connect sub-main lines perpendicular to crop rows
4. Lay drip laterals along each row at 30cm emitter spacing for vegetables (45–60cm for maize)
5. Flush the system before first use to remove debris

**Scheduling Irrigation**
Irrigate in the early morning to minimise evaporation losses. Use a tensiometer or soil moisture feel test to determine timing — soil should be moist but not waterlogged. Most vegetables require 25–35mm per week.

**Maintenance**
Flush laterals weekly during use. Check for blocked emitters monthly. Store drip lines indoors during the off-season to protect from UV degradation. A well-maintained system lasts 5–8 years.

**Cost-Benefit**
An entry-level drip kit for 0.1 ha costs approximately $80–$120. With a second crop cycle per year enabled by irrigation, most farmers recover costs within one season. Cooperative bulk purchasing can reduce kit costs by 20–30%.`,
  },
];

// ── Cooperative ───────────────────────────────────────────────────────────────
export const cooperative: Cooperative = {
  id: 'coop1',
  name: 'Lusaka Smallholders Cooperative',
  location: 'Lusaka, Zambia',
  founded: '2019',
  plan: 'pro',
  memberCount: 48,
  totalFarmsHa: 156,
  monthlyRevenueUSD: 2400,
  description: 'A member-owned cooperative supporting smallholder farmers in the Lusaka region through collective marketing, input procurement, and capacity building.',
};

export const coopMembers: CoopMember[] = [
  { id:'m1', name:'Grace Phiri',   role:'chairperson', status:'active',   location:'Lusaka North',  joinedAt:'2019-01-15', farmsHa:4.5, phone:'+260 97 111 2233' },
  { id:'m2', name:'John Mwale',    role:'secretary',   status:'active',   location:'Lusaka East',   joinedAt:'2019-01-15', farmsHa:3.2, phone:'+260 97 222 3344' },
  { id:'m3', name:'Mary Tembo',    role:'treasurer',   status:'active',   location:'Lusaka South',  joinedAt:'2019-02-01', farmsHa:2.8, phone:'+260 97 333 4455' },
  { id:'m4', name:'Peter Banda',   role:'member',      status:'active',   location:'Lusaka West',   joinedAt:'2020-03-10', farmsHa:5.1, phone:'+260 96 444 5566' },
  { id:'m5', name:'Alice Zulu',    role:'member',      status:'inactive', location:'Lusaka Central',joinedAt:'2020-05-20', farmsHa:1.9, phone:'+260 96 555 6677' },
  { id:'m6', name:'David Nkosi',   role:'member',      status:'active',   location:'Chongwe',       joinedAt:'2021-01-08', farmsHa:3.8, phone:'+260 97 666 7788' },
  { id:'m7', name:'Susan Mutale',  role:'member',      status:'active',   location:'Kafue',         joinedAt:'2021-06-14', farmsHa:2.5, phone:'+260 96 777 8899' },
  { id:'m8', name:'Charles Lungu', role:'member',      status:'pending',  location:'Lusaka North',  joinedAt:'2026-03-01', farmsHa:1.2, phone:'+260 97 888 9900' },
];

export const announcements: Announcement[] = [
  { id:'an1', title:'Cooperative AGM — Thursday 20 March 2026', body:'The Annual General Meeting will be held at the Lusaka Cooperative Hall at 10:00am. All members are required to attend. Agenda: financial report, election of officials, bulk input order for next season.', authorName:'Grace Phiri', createdAt:'2026-03-14', priority:'high' },
  { id:'an2', title:'Bulk Fertiliser Order Open — Close 22 March', body:'We are consolidating the next bulk fertiliser order. Members can submit quantities through the platform by 22 March. Minimum order 2 bags. Expected savings of 18% vs market rate.', authorName:'Mary Tembo', createdAt:'2026-03-10', priority:'medium' },
  { id:'an3', title:'Training: Post-Harvest Handling — 25 March', body:'A free half-day training on post-harvest handling and aflatoxin prevention will be held on 25 March at the coop store. Facilitated by the Ministry of Agriculture extension team. Lunch provided.', authorName:'John Mwale', createdAt:'2026-03-08', priority:'medium' },
  { id:'an4', title:'New Storage Facility: Now Operational', body:'The cooperative grain storage facility is now open. Capacity: 200 tonnes. Rates: $2.50/tonne/month. Book your storage space through the platform or contact the secretary directly.', authorName:'Grace Phiri', createdAt:'2026-03-01', priority:'low' },
];

export const coopDocuments: CoopDocument[] = [
  { id:'d1', name:'Cooperative Constitution 2024', type:'PDF', uploadedBy:'Grace Phiri', uploadedAt:'2024-01-10', sizeMb:1.2 },
  { id:'d2', name:'Annual Financial Report 2025', type:'PDF', uploadedBy:'Mary Tembo', uploadedAt:'2026-01-30', sizeMb:2.8 },
  { id:'d3', name:'Member Register Q1 2026', type:'XLSX', uploadedBy:'John Mwale', uploadedAt:'2026-03-01', sizeMb:0.4 },
  { id:'d4', name:'Bulk Input Order Template', type:'XLSX', uploadedBy:'Mary Tembo', uploadedAt:'2026-03-10', sizeMb:0.2 },
  { id:'d5', name:'Meeting Minutes — Feb 2026', type:'PDF', uploadedBy:'John Mwale', uploadedAt:'2026-02-28', sizeMb:0.6 },
  { id:'d6', name:'Storage Facility Agreement', type:'PDF', uploadedBy:'Grace Phiri', uploadedAt:'2026-03-02', sizeMb:1.0 },
];
