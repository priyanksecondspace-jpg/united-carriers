# Placeholder real-estate copy. Everything here is SAMPLE content to be replaced with the
# client's real data (see ../PLACEHOLDER-CHECKLIST.md). Brand: "Arrival" by "Arrival".

BRAND = "Arrival"
DEVELOPER = "Arrival"
EMAIL = "sales@arrival.example"
PHONE = "+91 00000 00000"

LOGO_HTML = '<span class="rr-wordmark">ARRIVAL<span class="rr-wordmark-by">by Whitehaul</span></span>'

EXTRA_CSS = """<style id="rr-brand-style">
.rr-wordmark { font-family: inherit; font-weight: 700; letter-spacing: .32em; font-size: 1.8rem; line-height: 1; color: currentColor; white-space: nowrap; }
@media (max-width: 767px) { .rr-wordmark { font-size: 4rem; } }
/* shop, payments and freight-partner logos do not apply to a property site */
.home-partners, .footer-content-payment, .footer-legal-payment,
a[href="/merchandises"], .footer-legal-item:has(a[href="/payment-policy"]),
.footer-legal-item:has(a[href="/delivery-shipping-policy"]), .footer-legal-item:has(a[href="/refund-returns-policy"]),
.w-commerce-commercecartwrapper, .header-cart, [data-node-type="commerce-cart-wrapper"] { display: none !important; }
</style>"""

HREF = {
    "https://www.carboncare.org/en/co2-emissions-calculator": "/services",
    "http://u25prd.webtracker.wisegrid.net/Login/Login.aspx?ReturnUrl=%2fDefault.aspx": "/insights",
    "mailto:contact@unitedcarriers.com": "mailto:" + EMAIL,
    "tel:1300000082": "tel:+910000000000",
    "https://www.linkedin.com/company/united-carriers-apac/posts/?feedView=all": "#",
    "https://www.linkedin.com/company/united-carriers-apac/": "#",
    "https://www.instagram.com/unitedcarriersofficial": "#",
    "https://www.facebook.com/UnitedCarriersOfficial": "#",
}

ATTR = {
    "Blue Konecranes reach stacker vehicle with extended black boom on white background.": "Maroon and silver Rolls-Royce Ghost.",
    "Side view of a black semi-truck cab without a trailer attached.": "Side view of a maroon and silver Rolls-Royce Ghost.",
}

# ---------- shared site chrome (menu, footer, CTAs, contact) ----------
GLOBAL = {
    "work with us": "book a visit",
    "Work with us": "Book a visit",
    "Services": "Residences",
    "Our services": "View residences",
    "Our Services": "View residences",
    "Industries": "Amenities",
    "Insights": "News",
    "Merchandise": "Merchandise",
    "Connect with us:": "Visit our sales gallery:",
    "contact@unitedcarriers.com": EMAIL,
    "Follow us on linkedin": "Follow us on Instagram",
    "Carbon Calculator": "Floor plans",
    "Live Tracking Portal": "Construction updates",
    "News:": "Latest:",
    # top ticker of countries becomes the neighbourhood
    "Australia": "Marine Drive",
    "New Zealand": "Girgaum Chowpatty",
    "Hong Kong": "Royal Opera House",
    "China": "Kemps Corner",
    "Vietnam": "Malabar Hill",
    "United States": "Churchgate",
    "THAILAND": "NARIMAN POINT",
    "Germany": "Fort",
    "United Kingdom": "Worli",
    # ticker of services
    "Air Freight": "3 BHK Residences",
    "Ocean Freight": "4 BHK Residences",
    "Customs Brokerage": "Sky Villas",
    "Warehousing & 3PL": "Penthouses",
    "Project Cargo": "Clubhouse & Spa",
    "Domestic & Linehaul Transport": "Concierge & Valet",
    # footer
    "One operator. Every leg of the journey.": "Arrival. Welcome home.",
    "Company": "Arrival",
    "About us": "About us",
    "Contact us": "Contact us",
    "Fashion & Footwear": "Infinity pool",
    "Medical & Healthcare": "Clubhouse",
    "Retail": "Fitness centre",
    "Technology & Electronics": "Spa & sauna",
    "Energy & Renewables": "Landscaped podium",
    "Automotive & Industrial Equipment": "Children's play area",
    "Mining & Resources": "Co-working lounge",
    "Building & Construction": "Banquet hall",
    "Engineering & Manufacturing": "Library",
    "Food & Beverage": "Private theatre",
    "Agriculture & Commodities": "Yoga deck",
    "Freight Consolidation Programs": "Floor plans",
    "Cross-Docking & Bypass": "Price list",
    "Trade Compliance Advisory": "Home loans",
    "Supply Chain Optimization": "NRI desk",
    "Quarterly Business Reviews": "Site visits",
    "Freight & Marine Insurance": "Construction updates",
    "Head Offfice": "Sales gallery",
    "Head Office": "Sales gallery",
    "2A International Square, Tullamarine VIC 3043, Australia.": "Girgaon, Mumbai 400004 (sample address)",
    "Direction on Google": "Directions on Google",
    "Operating across": "Located in",
    "Email": "Email",
    "Hotline": "Phone",
    "1300 000 082": PHONE,
    "Office Hours": "Sales gallery hours",
    "Monday - Friday / 8:30AM - 5PM": "Monday - Sunday / 10AM - 7PM",
    "© 2026 United Carriers APAC Pty Ltd. Crafted by": "© 2026 Arrival (placeholder). Crafted by",
    "© 2026 United Carriers APAC Pty Ltd.": "© 2026 Arrival (placeholder).",
    "QHSE": "RERA disclosures",
    "Delivery Policy": "Delivery Policy",
}

# ---------- homepage ----------
HOME = {
    "One operator": "Arrival by Whitehaul · Girgaon",
    "Every leg of the journey": "Welcome\nHome",
    "Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.":
        "A private drive-in arrival, a sky garden above the Arabian Sea, and the quiet South Mumbai rarely allows. Sea-facing 3 and 4 BHK residences in Girgaon.",
    "Talk with us": "Book a site visit",
    "We move freight.": "We build homes.",
    "We own the outcome.": "We own every detail.",
    "With every service under one roof and one accountable team, your supply chain moves the way your business demands: predictably, transparently, and without excuses. That means no finger-pointing between vendors. No delays lost in handoffs. Just one team, accountable from origin to destination.":
        "From the first sketch to the day you receive your keys, one team designs, builds and looks after your home. Considered layouts, honest materials and a location that keeps the whole of South Mumbai within reach. (Sample copy.)",
    "Learn more about us": "Learn more about us",
    "From countless journeys, clarity emerges": "Built on decades of trust",
    "2,500": "120",
    "Shipments per month": "Residences in the tower",
    "98.2": "35",
    "On-time delivery rate": "Open and landscaped space",
    "8": "25",
    "Years in operation": "Years building in Mumbai",
    "Everything your freight needs.": "Everything a home should be.",
    "Under one group.": "Under one address.",
    "From air to sea, from customs clearance to final delivery, we bring decades of expertise across every freight discipline. Our integrated service network means one partner, one point of contact, and total visibility from origin to destination.":
        "From sea-facing residences to a full clubhouse, every part of Arrival is designed around the way families actually live. One address, one team, and complete clarity from booking to handover. (Sample copy.)",
    "Air freight": "3 BHK\nResidences",
    "Express, priority, and deferred options across global trade lanes — managed end to end for speed and schedule integrity.":
        "Sea-facing 3 BHK homes from 1,450 sq ft carpet, with private decks and city views. (Sample figures.)",
    "Ocean Freight": "4 BHK\nResidences",
    "FCL, LCL, and specialised cargo movements, with structured carrier selection and routing for cost and reliability.":
        "Generous 4 BHK homes from 2,100 sq ft carpet with a family lounge and staff quarters. (Sample figures.)",
    "Customs Brokerage": "Sky\nVillas",
    "In-house licensed brokerage covering classification, compliance, and quarantine — full control, no outsourcing.":
        "Duplex sky villas on the upper floors with double-height living rooms and open sea views. (Sample.)",
    "Warehousing and 3PL": "Signature\nPenthouses",
    "Scalable storage, pick and pack, and distribution — fully integrated with freight and transport operations.":
        "A limited collection of penthouses with private terraces and plunge pools. (Sample.)",
    "Project Cargo": "Clubhouse\n& Spa",
    "Specialist handling for oversized and complex shipments — from permits to engineered load configurations.":
        "Infinity pool, fitness centre, spa and residents' lounge across a landscaped podium. (Sample.)",
    "Domestic & Interstate Transport": "Concierge\n& Valet",
    "Local, metro, and interstate transport managed for consistent service levels and full delivery visibility.":
        "Round-the-clock concierge, valet parking and multi-level security for every resident. (Sample.)",
    "RELIABILITY": "TRANSPARENCY",
    "AT EVERY MILESTONE": "AT EVERY MILESTONE",
    "With every service under one roof and one accountable team, your supply chain moves the way your business demands: predictably, transparently, and without excuses.":
        "A RERA-registered project with clear timelines, regular construction updates and one relationship manager from booking to handover. (Sample copy; add the real RERA number.)",
    "Real-Time Freight Tracking": "Live\nConstruction\nUpdates",
    "Know exactly where your cargo is at every milestone. Live visibility means faster decisions and zero guesswork.":
        "Monthly progress photos and site reports, so you always know how your home is coming along.",
    "Global Network overage": "RERA\nRegistered\nProject",
    "From APAC lanes to international corridors, our partner network spans every major trade route your business relies on.":
        "Registered under MahaRERA with full disclosures. Registration number: [add RERA number].",
    "24/7 Customer Support": "Dedicated\nRelationship\nManager",
    "Real people, always available. Whether it is a routine update or an urgent issue, we pick up the phone and we own the outcome.":
        "One point of contact for site visits, payments, loans and handover, available seven days a week.",
    "Built for businesses that": "Built for families that",
    "can't afford": "won't settle for",
    "disruption.": "ordinary.",
    "Why us": "Why Arrival",
    "Logistics that works as hard as you do.": "A home that works as beautifully as you live.",
    "One Point of Contact": "A Prime South Mumbai Address",
    "No more chasing multiple vendors. One team manages your entire shipment from origin to destination.":
        "Minutes from Marine Drive, Chowpatty, the Opera House and Churchgate, in a quiet heritage precinct.",
    "Full Supply Chain Visibility": "Thoughtful Layouts",
    "Track your freight in real time and get proactive updates before issues become delays.":
        "Efficient, Vastu-aware plans with large windows, cross-ventilation and no wasted corridors.",
    "Compliance You Can Trust": "RERA-Registered & Transparent",
    "Our licensed customs brokers keep your shipments moving within every regulatory requirement across APAC.":
        "Every approval, timeline and specification is disclosed up front and kept up to date.",
    "Competitive, Transparent Pricing": "Clear, Honest Pricing",
    "No hidden fees. Clear, competitive pricing backed by responsive sales support throughout the shipment.":
        "All-inclusive pricing with no hidden charges, and flexible construction-linked payment plans.",
    "Fast Issue Resolution": "Care Beyond Handover",
    "When something unexpected happens, we do not point fingers — we solve it. Our team acts immediately to protect your timeline.":
        "A dedicated facilities team and defect-liability support long after you move in.",
    "Trusted by businesses": "Trusted by families",
    "across APAC": "across Mumbai",
    "From first-time importers to high-volume shippers, our customers keep coming back because we treat their freight like our own.":
        "From first-time buyers to returning homeowners, families choose Arrival for homes built to last. (Testimonials below are placeholders.)",
    "Thomas Munro": "Sample homeowner",
    "Francis Fung": "Sample homeowner",
    "Alex Hughes": "Sample homeowner",
    "Director": "Placeholder",
    "APAC Supply Chain Operations Director, US Fortune 500 Telecom and Communications Supplier": "Placeholder",
    "Senior Management": "Placeholder",
    "Picha Group": "replace with a real review",
    "Commscope": "replace with a real review",
    "Factory X": "replace with a real review",
    "What's moving": "What's new",
    "in your industry": "at Arrival",
    "Stay ahead of the shifts shaping trade across APAC — from regulatory changes to new shipping routes and supply chain trends.":
        "Construction progress, launches and neighbourhood stories from Arrival. (Sample articles.)",
    "Asia Pacific": "Arrival",
    "Featured": "Featured",
    "Market Updates": "Construction",
    "Straightforward answers, so you can move forward with confidence.": "Straightforward answers, so you can buy with confidence.",
    "What does United Carriers do?": "Where is Arrival located?",
    "United Carriers is a global freight forwarding and logistics provider delivering end-to-end supply chain solutions, including airfreight, seafreight, customs brokerage, warehousing, and transport.":
        "In Girgaon, South Mumbai, close to Marine Drive, Girgaum Chowpatty and the Royal Opera House. (Sample answer.)",
    "What industries do you specialise in?": "What configurations are available?",
    "We support a broad range of industries including retail, fashion, food & beverage, industrial, project cargo, and technology.":
        "3 and 4 BHK residences, duplex sky villas and a limited number of penthouses. (Sample answer.)",
    "What shipping methods do you offer?": "Is the project RERA registered?",
    "We offer airfreight, seafreight (FCL & LCL), breakbulk, RO/RO, and multimodal transport solutions.":
        "Yes. Add the MahaRERA registration number here once confirmed. (Placeholder.)",
    "Do you provide customs clearance services?": "When is possession expected?",
    "Yes, we offer in-house customs brokerage to manage import and export clearances efficiently.":
        "Add the RERA possession date here. (Placeholder.)",
    "How is freight pricing calculated?": "How is pricing structured?",
    "Pricing depends on factors such as shipment size, weight, origin, destination, mode of transport, and current market conditions.":
        "Pricing depends on the configuration, floor and view. Ask our team for the current price list and payment plans.",
    "Do you offer warehousing and 3PL services?": "Do you help with home loans?",
    "Yes, we provide storage, pick and pack, inventory management, and distribution solutions.":
        "Yes. We work with leading banks and can help you with pre-approved loan options. (Sample answer.)",
    "Can you handle oversized or heavy cargo?": "Can NRIs buy at Arrival?",
    "Yes, we specialise in project cargo including out-of-gauge (OOG) and heavy lift shipments.":
        "Yes. Our NRI desk handles virtual tours, documentation and remittance guidance. (Sample answer.)",
    "How do I request a quote?": "How do I book a site visit?",
    "You can contact us via our website, email, or phone with your shipment details.":
        "Book through this website, call us, or visit the sales gallery any day of the week.",
    "Still have questions? Our team is here to help.": "Still have questions? Our team is here to help.",
    "Ready to move smarter?": "Ready to come home?",
    "We are here to help you grow without hassle. No call centres. No runaround. Just experienced people ready to help.":
        "Visit the sample flat, walk the site and meet the team. No call centres, no pressure, just people who know every corner of Arrival.",
}

PAGES = {"": HOME}

HEAD_TITLE = {"": f"{BRAND} by Whitehaul | Luxury Homes in Girgaon, South Mumbai"}
HEAD_DESC = {"": "Sea-facing 3 and 4 BHK residences, sky villas and penthouses in Girgaon, South Mumbai. Placeholder description."}

# long texts matched by their opening words
PREFIX = {
    "My business wouldn't function without this team": "Placeholder testimonial. Replace this with a real quote from an Arrival homeowner, with their permission.",
    "As a first time supplier shipping equipment": "Placeholder testimonial. Replace this with a real quote from an Arrival homeowner, with their permission.",
    "I worked closely with Chris over several years": "Placeholder testimonial. Replace this with a real quote from an Arrival homeowner, with their permission.",
}

GLOBAL.update({
    "China–Australia Ocean Freight: Rates Are Moving Higher — What Importers Should Watch": "Site visits now open at Arrival (sample article)",
    "United Carriers & Christopher Lebon Named 2026 Local Business Awards Finalists": "Inside the sample flat: a walkthrough (sample article)",
    "UC COURTSIDE IS HERE": "Construction update: podium slab complete (sample article)",
    "China Set to Open Pinglu Canal – Its New Shortcut to South-East Asia": "Why Girgaon's heritage precinct is in demand (sample article)",
    "United Carriers Achieves Australian Trusted Trader Accreditation": "Arrival registered under MahaRERA (sample article)",
    "UC Market Update China - September": "Arrival construction update - October (sample article)",
})

# raw string swaps (footer wordmark images)
RAW = {
    'sizes="100vw" srcset="/assets/1cba028a053415f27cb2.png 500w, /assets/5b76e0f76e701ae9b570.png 800w, /assets/39938d5be982f2849a22.png 3296w" alt="" src="/assets/39938d5be982f2849a22.png"':
        'alt="" src="/assets/rr/brand/wordmark-footer.svg"',
    'src="/assets/c53ffc1de3d2bb617dc2.png"': 'src="/assets/rr/brand/wordmark-footer-mb.svg"',
    'id="source-image-footer" loading="lazy" alt="" src="/assets/9e75920b8ba1afb8f6c0.svg"':
        'id="source-image-footer" loading="lazy" alt="" src="/assets/rr/brand/wordmark-source.svg"',
}

# ---------- sections that name real people, clients, partners or offices: hidden ----------
EXTRA_CSS = EXTRA_CSS.replace("</style>", """
.about-team, .about-intro-maquee-wrap, .career-testi, .career-job, .commu-hero, .commu-charity,
.service-tech, .contact-hero-location { display: none !important; }
</style>""")

GLOBAL.update({
    "Community": "Neighbourhood",
    "Market Updates": "Construction",
    "Asia Pacific": "Arrival",
    "Ready to move smarter?": "Ready to come home?",
    "We are here to help you grow without hassle. No call centres. No runaround. Just experienced people ready to help.":
        "Visit the sample flat, walk the site and meet the team. No call centres, no pressure, just people who know every corner of Arrival.",
    "join our team": "join our team",
    "linkedin": "instagram",
    "LinkedIn": "Instagram",
})

ABOUT = {
    "Your trusted partner for": "The developer behind",
    "GLOBAL FREIGHT FORWARDING and LOGISTICS": "Arrival",
    "Your trusted partner in global freight forwarding and logistics — combining global reach, proven expertise, and the capability to deliver success across complex supply chains.":
        "Arrival builds considered homes in South Mumbai, combining honest design, careful construction and long-term care for every resident. (Sample copy.)",
    "Our story": "Our story",
    "Built around": "Built around",
    "alignment, visibility & accountability": "craft, clarity & care",
    "Our approach is simple: Align with your objectives, take accountability across every stage, and deliver success with measurable outcomes.":
        "Our approach is simple: design homes we would live in ourselves, explain every decision clearly, and stand behind our work long after handover.",
    "Our difference": "Our difference",
    "Operations are": "Design is",
    "Offices are": "Location is",
    "Business is": "Construction is",
    "Strive for": "Strive for",
    "operations are": "design is",
    "intelligent": "considered",
    "local": "central",
    "global": "precise",
    "excellence": "excellence",
    "VISION": "VISION",
    "To move the world - with Expertise, Integrity and Excellence.": "To build homes that families are proud to pass on. (Sample.)",
    "MISSION": "MISSION",
    "We enable global trade by delivering reliable logistics solutions and building efficient, robust and resilient supply chains for our clients.":
        "We deliver well-designed, transparently sold and carefully built residences in the heart of Mumbai. (Sample.)",
    "STRATEGY": "STRATEGY",
    "What we": "What we",
    "stand for": "stand for",
    "Our values aren’t just a list on the wall. They shape every decision we make, every conversation we have and every shipment we move.":
        "Our values aren't just a list on the wall. They shape every decision we make, every conversation we have and every home we build.",
    "We give advice, it comes from experience. We pride ourselves on having the knowledge to help you succeed.":
        "Decades of building in Mumbai inform every plan, specification and detail.",
    "Our confidence is backed by our expertise, so you can rest assured that you can rely on us.":
        "Clear timelines, honest disclosures and a team that answers your questions.",
    "We will bring a positive attitude that will facilitate success for our partners and our teams.":
        "We bring care and patience to every buyer conversation and every site visit.",
    "Integrity is at the heart of our business, embracing honesty, responsibility and accountability.":
        "Integrity is at the heart of our business: honest pricing, honest timelines, honest materials.",
    "Excellence can only be achieved by delivering on our values and the only measure of this is the way our customers perceive us.":
        "Excellence is measured by the families who live in our homes.",
    "Built Around": "Built Around",
    "Trade": "Mumbai",
    "The people": "The people",
    "behind the promise": "behind the promise",
    "Built on decades of experience across freight, customs, logistics tech, and client management — with a shared focus on getting it right.":
        "Architects, engineers and relationship managers with a shared focus on getting every detail right. (Add team details.)",
    "General Company & Capability": "The project",
    "Freight & Shipping": "Residences",
    "Customs & Compliance": "Approvals & RERA",
    "Pricing & Quotations": "Pricing & payment plans",
    "Warehousing & Logistics Solutions": "Amenities",
    "Project Cargo & Specialised Freight": "Construction",
    "Tracking & Communication": "Updates & communication",
    "Getting Started": "Getting started",
    "Risk, Insurance & Reliability": "Possession & after-sales",
    "Can’t find what you’re looking for? Speak to our team": "Can't find what you're looking for? Speak to our team",
    "What does United Carriers do?": "Where is Arrival located?",
    "Where are you located?": "Where is the sales gallery?",
    "We operate from Australia, New Zealand, Hong Kong, and China, supported by a global network of trusted logistics partners.":
        "On site in Girgaon, South Mumbai. Add the exact address and map link here. (Placeholder.)",
    "What industries do you specialise in?": "What configurations are available?",
    "What makes United Carriers different from other freight forwarders?": "What makes Arrival different?",
    "We combine global reach with hands-on expertise, providing tailored logistics solutions, strong communication, and proactive supply chain management.":
        "A rare South Mumbai location, efficient layouts, a full clubhouse and one relationship manager from booking to handover. (Sample.)",
    "How do I choose between airfreight and seafreight?": "How do I choose between a 3 BHK and a 4 BHK?",
    "Airfreight is faster but more expensive, while seafreight is more cost-effective for larger or less time-sensitive shipments. We assess your requirements and recommend the optimal solution.":
        "Our team walks you through both layouts, views and price points so you can choose what fits your family. (Sample.)",
    "What shipping methods do you offer?": "Is the project RERA registered?",
    "Do you handle door-to-door shipments?": "Can I visit the sample flat?",
    "Yes, we manage complete door-to-door logistics, including pickup, international freight, customs clearance, and final delivery.":
        "Yes, the sample flat is open every day. Book a slot or walk in during gallery hours. (Sample.)",
    "Can you handle urgent or time-critical shipments?": "Is parking included?",
    "Yes, we provide expedited and priority freight solutions for urgent cargo.": "Add parking allocation details here. (Placeholder.)",
    "Do you provide customs clearance services?": "When is possession expected?",
    "What documents are required for international shipping?": "What documents do I need to book?",
    "Typical documents include a commercial invoice, packing list, bill of lading or air waybill, and any applicable permits or certificates depending on the cargo.":
        "Typically PAN, Aadhaar or passport, address proof and the booking amount. Our team will confirm the full list. (Sample.)",
    "Can you assist with import permits and quarantine requirements?": "Do you help with registration and stamp duty?",
    "Yes, we manage import permits, biosecurity requirements, inspections, and any directed treatments.":
        "Yes, our team guides you through the agreement, stamp duty and registration. (Sample.)",
    "Do you provide advice on tariffs and duties?": "Are there any charges beyond the price?",
    "Yes, we provide guidance on HS classification, duties, taxes, and trade compliance requirements.":
        "Add GST, stamp duty, registration and maintenance deposit details here. (Placeholder.)",
    "How is freight pricing calculated?": "How is pricing structured?",
    "Can you provide fixed quotes?": "Do you offer payment plans?",
    "We provide both spot quotes and contract rates depending on your shipping volume and requirements.":
        "Yes, construction-linked plans are available. Add the current plans here. (Placeholder.)",
    "Are there any additional charges I should be aware of?": "Is there a floor-rise charge?",
    "Additional charges may include customs duties, taxes, terminal handling charges, and any special handling or compliance costs.":
        "Add floor-rise and view-premium details here. (Placeholder.)",
    "Do you offer warehousing and 3PL services?": "What amenities are included?",
    "Yes, we provide storage, pick and pack, inventory management, and distribution solutions.":
        "Infinity pool, clubhouse, fitness centre, spa, children's play area and a landscaped podium. (Sample list.)",
    "Can you integrate with our systems?": "Is there a co-working space?",
    "Yes, we utilise systems such as CargoWise and can integrate with client platforms for visibility and order management.":
        "Yes, a residents' co-working lounge is planned on the amenity floor. (Sample.)",
    "Do you offer cross-docking or warehouse bypass solutions?": "Are pets allowed?",
    "Yes, we design efficient solutions to minimise storage time and reduce costs.": "Add the society's pet policy here. (Placeholder.)",
    "What equipment do you use for project cargo?": "What is the construction technology?",
    "We utilise flat racks, open-top containers, breakbulk vessels, RO/RO services, and charter solutions.":
        "Add structural system, materials and specifications here. (Placeholder.)",
    "Do you manage permits and route planning?": "Who is the architect?",
    "Yes, we handle route assessments, permits, escort requirements, and compliance for oversized cargo.":
        "Add the architect and design consultants here. (Placeholder.)",
    "Can you handle oversized or heavy cargo?": "Can NRIs buy at Arrival?",
    "How do you handle delays or disruptions?": "How will I know about construction progress?",
    "We proactively communicate issues and provide alternative solutions to minimise impact on your supply chain.":
        "We share monthly progress photos and site reports with every buyer. (Sample.)",
    "Who will manage my shipments?": "Who will be my point of contact?",
    "You will have a dedicated point of contact supported by our customer service executive team.":
        "A dedicated relationship manager from booking to handover.",
    "Can I track my shipment?": "Can I visit the site during construction?",
    "Yes, we provide shipment visibility and regular status updates throughout the supply chain.":
        "Yes, guided site visits are arranged on request. (Sample.)",
    "Can you review and improve our current supply chain?": "Do you help with interiors?",
    "Yes, we offer supply chain analysis and optimisation to improve efficiency and reduce costs.":
        "Add interior or fit-out options here. (Placeholder.)",
    "What information do you need for a quote?": "What do I need to get a price quote?",
    "We typically require origin, destination, cargo details (weight, dimensions), incoterms, and timelines.":
        "Just tell us the configuration, floor and view you prefer, and we'll share current pricing.",
    "How do I request a quote?": "How do I book a site visit?",
    "Are you licensed and accredited?": "Is the land title clear?",
    "Yes, we operate in accordance with all relevant regulatory and industry standards in each region we serve.":
        "Add title, approval and RERA disclosure details here. (Placeholder.)",
    "How do you ensure cargo safety?": "What security does the building have?",
    "We work with vetted carriers and implement strict handling, compliance, and risk management procedures.":
        "Multi-level security with access control and CCTV. (Sample.)",
    "Do you offer cargo insurance?": "Is there a defect-liability period?",
    "Yes, with our affiliation with Midas Insurance, we can arrange freight and marine cargo insurance to protect your goods during transit.":
        "Yes, as per RERA. Add the defect-liability terms here. (Placeholder.)",
    "Can’t find what you’re looking for?": "Can't find what you're looking for?",
    "Speak to our team": "Speak to our team",
}

SERVICES = {
    "Supply Chain Coverage": "Residences at Arrival",
    "International freight, customs brokerage, logistics, and domestic transport services": "3 and 4 BHK residences, sky villas and penthouses",
    "Specialist solutions for project cargo, sensitive, industrial & defence logistics.": "With a full clubhouse, concierge and landscaped podium. (Sample.)",
    "Integrated logistics": "Homes designed",
    "for complex supply chains": "for the way you live",
    "CORE SERVICES": "RESIDENCES",
    "INTEGRATED SOLUTIONS": "SERVICES",
    "Fast freight. No delays at altitude": "3 BHK Residences. Light from three sides.",
    "start your shipment": "book a site visit",
    "Ocean freight built for volume and reliability.": "4 BHK Residences. Room for every generation.",
    "Compliance handled. Borders cleared.": "Sky Villas. Double-height living.",
    "Your inventory, exactly where it needs to be.": "Signature Penthouses. A private terrace in the sky.",
    "Complex cargo. Managed from every angle.": "Clubhouse & Spa. Everything within the building.",
    "Last mile and beyond — managed by our own team.": "Concierge & Valet. Taken care of, every day.",
    "Smarter shipments, lower cost per unit.": "Floor plans. Every layout, explained.",
    "Less handling, faster delivery.": "Price list. Clear and complete.",
    "Regulatory risk, managed and optimised.": "Home loans. Pre-approved with leading banks.",
    "Advisory that turns data into performance.": "NRI desk. Buy with confidence from anywhere.",
    "Transparency, built into every quarter.": "Site visits. See it for yourself.",
    "Protection for every movement, every mile.": "Construction updates. Every month, in pictures.",
}

INDUSTRIES = {
    "United Carriers operates where freight complexity is highest and reliability is essential": "Amenities designed for every age and every hour",
    "Complex shipments are handled with precision, even under tight deadlines and strict requirements": "Spaces to swim, train, unwind and gather, all within the building",
    "Industry expertise helps navigate challenges across a wide range of sectors": "Managed by a dedicated facilities team",
    "From planning to final delivery, seamless support ensures every shipment stays on track.": "From the first morning swim to a late movie night. (Sample copy.)",
    "SCROLL TO EXPLORE": "SCROLL TO EXPLORE",
    "Our industries": "Our amenities",
    "We know": "Made for",
    "your industry": "everyday life",
    "Why choose us": "Highlights",
}

CONTACT = {
    "Get": "Get",
    "in touch": "in touch",
    "Have a question or need support? Our team is here to help.": "Have a question or want to visit? Our team is here to help.",
    "Working Hours": "Sales gallery hours",
    "8:30AM - 5PM": "10AM - 7PM, all week (sample)",
    "socials": "socials",
    "Book an appointment": "Book a site visit",
    "Use the form below to tell us about your enquiry and we’ll call you back to schedule an appointment. Our general response time is within one business day.":
        "Tell us a little about what you're looking for and we'll call you back to schedule a visit. (Form submission is disabled in this local copy.)",
    "Reason of enquiry": "I'm interested in",
    "Domestic & Interstate Transport": "3 BHK Residences",
    "Sea Freight": "4 BHK Residences",
    "APAC Emerging Markets": "Sky Villas",
    "Brokerage": "Penthouses",
    "Tariff/Compliance Audits": "Price list",
    "Consolidation Programs": "Home loans",
    "3PL": "NRI enquiry",
    "Partnership": "Channel partner",
    "Crossdock/By-pass Solutions": "Site visit",
    "Other": "Other",
    "Your infomation": "Your information",
}

CAREERS = {
    "We empower people to power business. Growing fast across APAC, we’re looking for driven individuals who value impact and accountability.":
        "We build homes people are proud of. We're looking for architects, engineers, sales and relationship professionals who care about the details. (Sample copy.)",
    "View open positions": "Get in touch",
    "You will work on real supply chain challenges across international markets, supporting clients who rely on precision, speed, and consistency. Our culture is professional, supportive, and grounded. We value people who bring skill, initiative, and a commitment to doing things properly.":
        "You will work on real projects in one of Mumbai's most storied neighbourhoods, alongside people who care about craft and clarity. (Sample copy.)",
    "Global Exposure": "Landmark Projects",
    "Work on global freight movements across air, sea, and integrated logistics solutions.": "Work on residences in the heart of South Mumbai.",
    "Complex Challenges": "Real Craft",
    "Navigate and solve complex supply chain requirements across multiple industries.": "Solve design and construction challenges with experienced teams.",
    "Direct Engagement": "Direct Engagement",
    "Engage directly with experienced operators, clients, and company leadership.": "Work directly with homebuyers, consultants and company leadership.",
    "We believe that people do their best work when they feel supported, valued, and trusted. Here's what we offer everyone who joins United Carriers.":
        "We believe people do their best work when they feel supported, valued and trusted. Here's what we offer everyone who joins Arrival.",
    "Work on real global supply chains where your decisions directly influence outcomes. The work is commercially relevant and highly visible.":
        "Your decisions shape homes that families will live in for decades.",
    "Gain exposure across international freight and multiple industries to build genuine expertise, not just process familiarity.":
        "Gain experience across design, construction, sales and customer care.",
    "Represent a business known for reliability, with a proven track record and clear growth trajectory across APAC.":
        "Represent a developer known for honest dealings and careful construction.",
}

COMMUNITY = {
    "Your team could be next": "Life in Girgaon",
    "We're actively expanding our partnerships across sport, community and social impact. If your club, league or non-profit is doing meaningful work, we'd love to hear from you.":
        "Heritage streets, the sea at Chowpatty and the city's best food, theatre and schools within minutes. Add neighbourhood highlights here. (Placeholder.)",
    "Get in touch": "Book a visit",
    "FUTURE PARTNERSHIP": "NEIGHBOURHOOD",
    "This space is reserved for our next community partner": "Add neighbourhood photos and stories here",
    "Highlights": "Highlights",
    "from Community": "from the neighbourhood",
    "Moments from across our sponsorships, charity work and grassroots community engagement.": "Places our residents love, minutes from home. (Placeholder.)",
}

PAGES.update({"about": ABOUT, "services": SERVICES, "industries": INDUSTRIES, "contact": CONTACT, "careers": CAREERS, "community": COMMUNITY})

PREFIX.update({
    "It’s not about us — it’s about you.": "It's not about us, it's about you. Arrival works alongside every buyer to make choosing a home clear, honest and unhurried. (Sample copy; add the real company story.)",
    "Supported by fully integrated systems, including CargoWise One": "Supported by experienced architects, structural consultants and project managers, we bring structure, transparency and quality control to every stage of construction. (Sample.)",
    "United Carriers operates through strategically located offices": "Arrival is rooted in South Mumbai, close to the neighbourhoods our residents call home. (Sample.)",
    "This partner powered integrated network enables us": "Working with trusted consultants, contractors and suppliers, we deliver consistent quality across every project. (Sample.)",
    "Every service delivered by United Carriers is supported by advanced": "Every residence is supported by a dedicated relationship manager and facilities team.",
    "We deliver scalable freight and logistics solutions tailored": "Thoughtfully planned homes and services, designed around the way families live today. (Sample copy.)",
    "Time-critical air freight services": "Sea-facing 3 BHK homes with efficient layouts and light from three sides. (Sample.)",
    "Our services include express, priority, and deferred airfreight": "Add carpet area, specifications and floor plan details here. (Placeholder.)",
    "Comprehensive ocean freight management": "Generous 4 BHK homes with a family lounge and staff quarters. (Sample.)",
    "We manage carrier contracts, space allocation": "Add carpet area, specifications and floor plan details here. (Placeholder.)",
    "Licensed customs brokerage delivered internally": "Duplex sky villas with double-height living rooms on the upper floors. (Sample.)",
    "Our services include tariff classification, customs valuation": "Add carpet area, specifications and floor plan details here. (Placeholder.)",
    "Scalable warehousing and fulfilment services": "A limited collection of penthouses with private terraces and plunge pools. (Sample.)",
    "Our 3PL capability integrates seamlessly": "Add carpet area, specifications and floor plan details here. (Placeholder.)",
    "United Carriers operates a dedicated Project Cargo Division": "Infinity pool, fitness centre, spa and residents' lounge across a landscaped podium. (Sample.)",
    "We manage the end-to-end delivery of oversized": "Add the full amenity list here. (Placeholder.)",
    "Reliable and performance-managed transport solutions": "Round-the-clock concierge, valet parking and multi-level security. (Sample.)",
    "United Carriers coordinates both asset-based and partner carriers": "Add service details here. (Placeholder.)",
    "Strategically designed consolidation programs": "Detailed floor plans for every configuration, available on request.",
    "By establishing clear consolidation rules and exceptions": "Add downloadable floor plans here. (Placeholder.)",
    "Solutions designed to reduce handling": "A clear, complete price list with no hidden charges.",
    "By bypassing traditional warehousing": "Add the current price list here. (Placeholder.)",
    "Specialist advisory services focused on managing regulatory risk": "Pre-approved home loan options with leading banks.",
    "United Carriers provides support across tariff classification": "Add partner banks here. (Placeholder.)",
    "Advisory-led support to analyse, design": "Virtual tours, documentation and remittance guidance for NRI buyers.",
    "We work with clients to identify inefficiencies": "Add NRI desk contact details here. (Placeholder.)",
    "United Carriers provides structured performance reporting": "Guided visits to the sample flat and the site, every day of the week.",
    "These sessions are designed to deliver actionable insights": "Add visit timings and booking details here. (Placeholder.)",
    "United Carriers works with an affiliated insurance partner": "Monthly progress photos and site reports for every buyer.",
    "Through this partnership, we can arrange tailored coverage": "Add the latest construction update here. (Placeholder.)",
    "Every industry moves differently.": "Every amenity is designed to be used every day, not just admired in a brochure. (Sample copy.)",
    "Our team operates with a shared standard": "Our team works to a shared standard: deliver consistently, improve continuously and treat every buyer with respect. (Sample.)",
    "You will work on real supply chain challenges": "You will work on real projects in one of Mumbai's most storied neighbourhoods, alongside people who care about craft and clarity. (Sample copy.)",
})

_AMEN = [
 ("Fast-moving logistics for fashion supply chains that can’t afford delays", "A 25-metre infinity pool overlooking the city",
  ["Time-critical delivery for seasonal launches", "Multi-market customs & retail distribution support", "Real-time shipment visibility across the supply chain"],
  ["Temperature-controlled water", "Sun deck with cabanas", "Separate children's pool"],
  ["Fashion supply chains are time-sensitive.", "From sourcing to final-mile distribution"]),
 ("Precision logistics for critical healthcare and medical supply chains", "A residents' clubhouse for every occasion",
  ["Temperature-controlled and time-critical delivery", "Full regulatory and compliance coordination", "Secure chain-of-custody shipment management"],
  ["Lounge and games room", "Private dining room", "Bookable for residents' events"],
  ["Medical freight demands absolute accuracy", "We support hospitals, laboratories"]),
 ("Coordinated retail logistics built for fast rollouts and store-ready delivery", "A fully equipped fitness centre",
  ["Store-ready delivery with precise rollout scheduling", "Specialist handling for fixtures, signage, and fitout materials", "Multi-location retail distribution and replenishment support"],
  ["Cardio and strength zones", "Personal training on request", "Open early to late"],
  ["Retail logistics depends on precise timing", "We support retailers, franchise networks"]),
 ("Secure, time-critical logistics for high-value technology supply chains", "A spa and sauna to unwind",
  ["Secure handling for high-value technology cargo", "Fast-track customs and pre-launch coordination", "Real-time visibility across global technology supply chains"],
  ["Steam and sauna rooms", "Massage and treatment rooms", "Quiet relaxation lounge"],
  ["Technology logistics demands speed", "We support technology brands"]),
 ("Specialist logistics for large-scale renewable energy and infrastructure projects", "A landscaped podium garden",
  ["Specialist handling for oversized and project cargo", "End-to-end coordination across multimodal transport networks", "Freight planning aligned with construction and deployment timelines"],
  ["Shaded walking paths", "Seating courts and lawns", "Native planting"],
  ["Renewable energy projects depend on precise coordination", "We support renewable energy developers"]),
 ("Reliable logistics solutions for complex automotive and industrial supply chains", "A safe, playful children's area",
  ["Production-aligned delivery to minimise operational downtime", "Secure handling for industrial equipment and automotive components", "Scalable distribution for OEM and aftermarket supply chains"],
  ["Soft-floor play zone", "Indoor activity room", "Visible from the lounge"],
  ["Automotive and industrial operations rely", "We support OEM manufacturers"]),
 ("Critical logistics support for remote, high-risk energy and resources operations", "A co-working lounge for work from home",
  ["Rapid-response logistics for remote and high-risk operations", "Specialist handling for hazardous and oversized cargo", "Operational coordination focused on minimising downtime"],
  ["Bookable meeting rooms", "High-speed Wi-Fi", "Quiet focus desks"],
  ["Oil, gas, and mining projects rely", "We support energy producers"]),
 ("Construction logistics coordinated around project timelines and site delivery precision", "A banquet hall for celebrations",
  ["Delivery scheduling aligned with construction milestones", "Coordinated site access and staged freight management", "Proactive communication to minimise project disruption"],
  ["Hosts family functions", "Catering kitchen", "Bookable by residents"],
  ["Construction supply chains depend on carefully staged", "We support builders, developers"]),
 ("Specialist logistics solutions for oversized, heavy-lift, and out-of-gauge cargo", "A private theatre for movie nights",
  ["End-to-end management for oversized and heavy-lift cargo", "Specialist coordination across permits, routing, and vessel planning", "On-site supervision to ensure safe and compliant project execution"],
  ["Recliner seating", "Cinema-grade sound", "Bookable for private screenings"],
  ["Project cargo logistics requires detailed planning", "We support infrastructure, energy, industrial"]),
 ("Precision logistics solutions built around manufacturing and production continuity", "A quiet library and reading room",
  ["JIT logistics coordination aligned with production schedules", "Expertise in industrial compliance and capital equipment freight", "Cost-optimised supply chain solutions without compromising reliability"],
  ["Curated collection", "Reading nooks", "Study tables for students"],
  ["Engineering and manufacturing supply chains depend", "We support manufacturers, industrial engineers"]),
 ("Reliable cold-chain and food logistics solutions for time-sensitive supply chains", "An open-air yoga and meditation deck",
  ["Temperature-controlled logistics for sensitive food products", "Expertise in food import and biosecurity compliance", "Reliable distribution for time-critical retail and supply chains"],
  ["Sunrise yoga sessions", "Meditation corner", "Shaded deck"],
  ["Food and beverage logistics demands strict compliance", "We support food producers, distributors"]),
 ("Reliable logistics solutions for agricultural exports and critical energy infrastructure", "A jogging track around the podium",
  ["Expertise in biosecurity and agricultural compliance requirements", "Reliable delivery coordination for remote energy operations", "End-to-end management for seasonal and time-critical freight"],
  ["Cushioned running surface", "Lit for evening runs", "Outdoor fitness stations"],
  ["Energy and agriculture supply chains rely", "We support producers, exporters"]),
]
for old_head, new_head, old_b, new_b, para in _AMEN:
    INDUSTRIES[old_head] = new_head
    for o, n in zip(old_b, new_b):
        INDUSTRIES[o] = n
    PREFIX[para[0]] = new_head + ", designed for everyday use by residents. (Sample description; add real specifications.)"
    PREFIX[para[1]] = "Managed and maintained by the Arrival facilities team. (Placeholder.)"
INDUSTRIES.update({"(": "", "including fitout": "", ")": "", "OOG": ""})

_NEWS = {
 "2 Million People Evacuated as Typhoon Makes Landfall in China": "Monsoon-ready: how Arrival is built for Mumbai's rains",
 "A New Era for Shippers, with Blanked Sailings Now a Fact of Life": "A new era for South Mumbai homebuyers",
 "BMSB SEASON 2026–2027": "Festive season offers 2026",
 "Colombia Earthquake Disrupts Key Freight and Export Routes": "Earthquake-resistant design, explained",
 "Confidential National Infrastructure Manufacturer": "Meet the architects behind Arrival",
 "Conflict Drives Up Bunker Prices, Helping Intra-Asia Rates End Six-Week Decline": "What drives property prices in South Mumbai",
 "Corporate Vision’s Logistics - Best Freight Forwarding Company 2026 – APAC - Warehouse and Supply Chain Awards": "Arrival shortlisted for a design award",
 "Cost-Optimised and Speed to market Import Program for New Truck Launch in Australia": "Choosing between a 3 BHK and a 4 BHK",
 "Global shipping rates soar as retailers race to beat looming tariffs": "Home loan rates: what buyers should watch",
 "Grid-Scale Battery Project Logistics Delivery for Renewable Energy Infrastructure": "Solar, rainwater harvesting and green features at Arrival",
 "Has the Peak Peaked or Has Space Raced?": "Is now the right time to buy in South Mumbai?",
 "Hong Kong–Europe Air Cargo Volumes Plummet": "Life near Girgaum Chowpatty",
 "How an Australian Freight Forwarder’s Website Unexpectedly Went Viral": "A virtual tour of Arrival",
 "Major Fleet-Wide Fuel Efficiency Agreement Signals Ongoing Focus on Shipping Performance and Decarbonisation": "Our sustainability commitments",
 "Phoenix and United Carriers continue partnership into NBL27": "Celebrating with our first homeowners",
 "Red Alert: Shanghai Cancels 80% of Flights as Typhoon Dolphin Makes Landfall": "Construction safety on site",
 "Reduced Import Delays & Storage Costs Across 700+ Containers": "Inside the clubhouse",
 "South East Asia Now Making the Rates Running": "Why Girgaon is South Mumbai's next address",
 "The Panama Canal Is Growing More Important": "Getting around: transport links from Arrival",
 "Time-Critical Oversized Sewer Tank Delivery to Residential Estate Development": "Planning a family home for every generation",
 "Typhoon Rips Roofs Off Buildings and Floods Southern China": "Waterproofing and drainage at Arrival",
 "Typhoon Saudel & Ongoing Port Congestion": "Parking and traffic planning at Arrival",
 "Typhoon Signal Unlikely in Hong Kong This Weekend as Flights to Japan Cancelled": "Weekend site visits now available",
 "United Carriers APAC Recognised in AFR Fast Starters": "A guide to RERA for homebuyers",
 "United Carriers Wins FWA of the Day": "The Arrival website goes live",
 "US Announces New Tariffs on More Than 60 Trading Partners": "Stamp duty and registration, explained",
 "US Tariffs: Refunds, Section 301 Duties and Importer Advice": "Buying from abroad: an NRI guide",
 "World Container Index – 16 July 2026": "Construction update: July 2026",
}
for k, v in _NEWS.items():
    GLOBAL[k] = v + " (sample article)"
GLOBAL.update({
    "AI news": "Neighbourhood", "AI News": "Neighbourhood", "Global": "Project", "Europe": "Design", "Rest of World": "Lifestyle",
    "Middle East & Africa": "Buying guide", "Asia": "Location", "Americas": "Offers", "Company Update": "Company update",
    "Company News": "Company news", "Industry News": "Market news", "Case Studies": "Homeowner stories",
    "SOCIAL updates": "SOCIAL updates", "articles": "articles",
})

NEWS_BODY = ("<h4>Sample article</h4><p>This is placeholder text for a news article on the Arrival website. "
             "Replace it with the real article: construction progress, launch news, neighbourhood stories or buying advice.</p>"
             "<p>Keep each article short and factual, add photos from site, and link to the relevant residence or amenity page.</p>")
NEWS_INTRO = "Placeholder summary. Add a one-line summary of this article."
