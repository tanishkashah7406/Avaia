import type { Product, SellerListing, FragranceProfile } from './types'

// ---- helpers ----
const sellers = ['Nykaa', 'Tira', 'Sephora', 'Myntra', 'Ajio']
const badges = [
  'Best Seller',
  '10% Off',
  'New Arrival',
  'Limited Edition',
  'Flash Sale',
  'Trending',
  'Free Gift',
  null,
]
const deliveries = [
  '1-2 days',
  '2-3 days',
  '3-5 days',
  '5-7 days',
  '1-2 days (Express)',
]

// seeded random for deterministic output
let seed = 42
function seededRand() {
  seed = (seed * 16807 + 0) % 2147483647
  return (seed - 1) / 2147483646
}
function pick<T>(arr: T[]): T {
  if (!arr?.length) return undefined as any
  return arr[Math.floor(seededRand() * arr.length)]
}
function randInt(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min
}
function roundPrice(p: number) {
  return Math.round(p / 10) * 10 + 9
}

function generateSellerListings(basePrice: number): SellerListing[] {
  const count = randInt(3, 5)
  const selected = [...sellers].sort(() => seededRand() - 0.5).slice(0, count)
  return selected.map((name) => ({
    sellerName: name,
    price: roundPrice(basePrice * (0.85 + seededRand() * 0.35)),
    deliveryEstimate: pick(deliveries),
    availability: seededRand() > 0.1 ? 'In Stock' : 'Out of Stock',
    offerBadge: pick(badges),
    verified: seededRand() > 0.15,
  }))
}

// ---- raw data templates ----
interface ShadeTemplate {
  brand: string
  name: string
  shades: string[]
  basePrice: number
  desc: string
  image?: string
}
interface SingleTemplate {
  brand: string
  name: string
  shade?: string | null
  basePrice: number
  desc: string
  image?: string
}
interface FragranceTemplate {
  brand: string
  name: string
  basePrice: number
  desc: string
  notes: { top: string[]; middle: string[]; base: string[] }
  longevity: string
  projection: string
  image?: string
}

// ---- category fallback images ----
const categoryFallbackImages: Record<string, string> = {
  'Foundation': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  'Concealer': 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80',
  'Lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
  'Skincare': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80',
  'Fragrance': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80',
  'Eye': 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&q=80',
  'Blush & Contour': 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=400&q=80',
  'Primer & Setting': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
  'default': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
}

const foundations: ShadeTemplate[] = [
  { brand: 'Estee Lauder', name: 'Double Wear Stay-in-Place Foundation', shades: ['1N1 Ivory Nude', '1W1 Bone', '2W1 Dawn', '3W1 Tawny', '4N1 Shell Beige', '5W1 Bronze', '6W1 Sandalwood'], basePrice: 3900, desc: 'Long-wearing, buildable coverage foundation with a natural matte finish that lasts up to 24 hours.' },
  { brand: 'MAC', name: 'Studio Fix Fluid SPF 15', shades: ['NC15', 'NC25', 'NC30', 'NC35', 'NC40', 'NC42', 'NC44', 'NW25'], basePrice: 3450, desc: 'A modern, long-wearing formula with a natural matte finish and medium-to-full buildable coverage.' },
  { brand: 'Maybelline', name: 'Fit Me Matte + Poreless Foundation', shades: ['110 Porcelain', '120 Classic Ivory', '220 Natural Beige', '230 Natural Buff', '310 Sun Beige', '330 Toffee'], basePrice: 499, desc: 'Lightweight foundation that mattifies and refines pores for a natural, seamless finish.' },
  { brand: 'LOreal Paris', name: 'Infallible 24H Fresh Wear Foundation', shades: ['100 Linen', '120 Vanilla', '125 Natural Rose', '220 Sand', '300 Amber', '320 Caramel'], basePrice: 1099, desc: 'Ultra-lightweight, long-wearing coverage with a breathable formula that resists sweat and humidity.' },
  { brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Foundation', shades: ['1 Cool', '3 Fair', '5 Neutral', '7.5 Medium', '9 Warm', '11 Deep', '15 Deep'], basePrice: 4500, desc: 'A full-coverage, hydrating foundation with a flawless, photo-ready finish that lasts up to 16 hours.' },
  { brand: 'NARS', name: 'Natural Radiant Longwear Foundation', shades: ['Deauville', 'Barcelona', 'Valencia', 'Syracuse', 'Macao', 'Tahoe'], basePrice: 4100, desc: 'A full-coverage foundation with a natural luminous finish and 16-hour fade-resistant wear.' },
  { brand: 'Bobbi Brown', name: 'Skin Long-Wear Weightless Foundation SPF 15', shades: ['Porcelain', 'Sand', 'Warm Ivory', 'Natural', 'Honey', 'Warm Almond'], basePrice: 4300, desc: 'A moisture-rich, oil-free formula that looks and feels like a second skin.' },
  { brand: 'Dior', name: 'Forever Skin Glow Foundation', shades: ['0N Neutral', '1W Warm', '2N Neutral', '3W Warm', '4N Neutral', '5N Neutral'], basePrice: 4900, desc: 'A clean, radiant foundation with 24-hour hydration and medium-to-full buildable coverage.' },
  { brand: 'Fenty Beauty', name: 'Pro Filtr Soft Matte Longwear Foundation', shades: ['100', '150', '230', '290', '340', '385', '420', '450'], basePrice: 3600, desc: 'A soft matte, long-wearing foundation with buildable, medium-to-full coverage in a boundary-breaking range of shades.' },
  { brand: 'Lakme', name: 'Perfecting Liquid Foundation', shades: ['Marble', 'Coral', 'Shell', 'Pearl', 'Natural', 'Beige Honey'], basePrice: 299, desc: 'Lightweight liquid foundation that gives a dewy, natural-looking finish with light coverage.' },
]

const concealers: ShadeTemplate[] = [
  { brand: 'NARS', name: 'Radiant Creamy Concealer', shades: ['Chantilly', 'Vanilla', 'Custard', 'Ginger', 'Amande', 'Cafe'], basePrice: 3200, desc: 'Medium-to-full buildable coverage concealer with a luminous, crease-proof finish.' },
  { brand: 'Maybelline', name: 'Instant Age Rewind Concealer', shades: ['Fair', 'Light', 'Medium', 'Sand', 'Caramel', 'Mocha'], basePrice: 599, desc: 'A concentrated, anti-aging concealer that helps erase dark circles and fine lines.' },
  { brand: 'MAC', name: 'Studio Fix 24-Hour Smooth Wear Concealer', shades: ['NC15', 'NC20', 'NC30', 'NC35', 'NC42', 'NW25'], basePrice: 2700, desc: 'A full-coverage, 24-hour concealer that smooths imperfections with a natural finish.' },
  { brand: 'Too Faced', name: 'Born This Way Super Coverage Concealer', shades: ['Cloud', 'Vanilla', 'Natural Beige', 'Warm Sand', 'Caramel', 'Cocoa'], basePrice: 3000, desc: 'An instant-coverage, oil-free concealer that hides dark circles, imperfections and pores.' },
  { brand: 'Tarte', name: 'Shape Tape Full Coverage Concealer', shades: ['8B Porcelain Beige', '12N Fair Neutral', '22N Light Neutral', '29N Light-Medium', '35H Medium Honey', '44S Tan Sand'], basePrice: 2900, desc: 'A full-coverage, long-wearing concealer that brightens, smooths, and contours.' },
  { brand: 'Charlotte Tilbury', name: 'Beautiful Skin Radiant Concealer', shades: ['1', '3', '5', '7', '9', '11'], basePrice: 3400, desc: 'Medium-coverage, hydrating concealer with hyaluronic acid that reduces dark circles.' },
]

const lipsticks: ShadeTemplate[] = [
  { brand: 'MAC', name: 'Matte Lipstick', shades: ['Ruby Woo', 'Velvet Teddy', 'Whirl', 'Diva', 'Mehr', 'Marrakesh', 'Chili'], basePrice: 1750, desc: 'Iconic matte lipstick with intense color payoff and a comfortable, non-drying formula.' },
  { brand: 'Charlotte Tilbury', name: 'Matte Revolution Lipstick', shades: ['Pillow Talk', 'Walk of No Shame', 'Bond Girl', 'Red Carpet Red', 'Very Victoria', 'Super Nineties'], basePrice: 3400, desc: 'A hydrating, full-coverage matte lipstick with a cashmere-soft feel.' },
  { brand: 'NARS', name: 'Audacious Lipstick', shades: ['Anna', 'Brigitte', 'Charlotte', 'Barbara', 'Anita', 'Rita'], basePrice: 3200, desc: 'A full-coverage lipstick with a velvety semi-matte finish that feels like a treatment.' },
  { brand: 'Maybelline', name: 'Super Stay Matte Ink', shades: ['Lover', 'Pioneer', 'Seeker', 'Dreamer', 'Loyalist', 'Voyager', 'Dancer'], basePrice: 649, desc: 'Liquid lipstick that delivers up to 16 hours of super stay color with a flawless matte finish.' },
  { brand: 'Lakme', name: '9to5 Primer + Matte Lip Color', shades: ['Rosy Sunday', 'Blushing Nude', 'Red Coat', 'Berry Base', 'Crimson Cue', 'Maroon Mix'], basePrice: 399, desc: 'A matte lipstick with built-in primer for all-day comfortable wear and vivid color.' },
  { brand: 'Bobbi Brown', name: 'Luxe Lipstick', shades: ['Pink Cloud', 'Neutral Rose', 'Bahama Brown', 'Burnt Rose', 'Parisian Red', 'New York Sunset'], basePrice: 3500, desc: 'A satin-finish lipstick infused with vitamins and hyaluronic acid for hydrated color.' },
  { brand: 'Dior', name: 'Rouge Dior Lipstick', shades: ['100 Nude Look', '277 Osee', '461 Natural Denim', '720 Icone', '999 Iconic Red', '772 Classic'], basePrice: 3900, desc: 'A couture lipstick in satin and matte finishes with floral lip care.' },
  { brand: 'Fenty Beauty', name: 'Stunna Lip Paint', shades: ['Uncensored', 'Unveil', 'Unbutton', 'Uncuffed', 'Underdawg', 'Uninvited'], basePrice: 2500, desc: 'A weightless, long-wearing liquid lipstick with a soft matte finish.' },
]

const skincareItems: SingleTemplate[] = [
  { brand: 'CeraVe', name: 'Hydrating Facial Cleanser', basePrice: 1199, desc: 'A gentle, non-foaming cleanser with ceramides and hyaluronic acid that hydrates while cleansing.' },
  { brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', basePrice: 590, desc: 'A high-strength vitamin and mineral formula that visibly reduces blemishes and congestion.' },
  { brand: 'The Ordinary', name: 'Hyaluronic Acid 2% + B5', basePrice: 590, desc: 'A hydration support formula with ultra-pure, vegan hyaluronic acid for plump, dewy skin.' },
  { brand: 'Neutrogena', name: 'Hydro Boost Water Gel', basePrice: 899, desc: 'An oil-free, non-comedogenic moisturizer with hyaluronic acid for supple, smooth skin.' },
  { brand: 'Clinique', name: 'Moisture Surge 100H Auto-Replenishing Hydrator', basePrice: 3500, desc: 'A gel-cream moisturizer that delivers intense 100-hour hydration with aloe bio-ferment.' },
  { brand: 'La Roche-Posay', name: 'Effaclar Duo+ Moisturiser', basePrice: 1699, desc: 'A corrective and unclogging anti-imperfection moisturizer for oily and acne-prone skin.' },
  { brand: 'Olay', name: 'Regenerist Micro-Sculpting Cream', basePrice: 1899, desc: 'An advanced anti-aging moisturizer with amino-peptide complex and hyaluronic acid.' },
  { brand: 'SK-II', name: 'Facial Treatment Essence', basePrice: 8500, desc: 'An iconic essence with over 90% PITERA that transforms skin clarity, firmness, and radiance.' },
  { brand: 'Tatcha', name: 'The Dewy Skin Cream', basePrice: 6800, desc: 'A rich plumping cream that feeds skin with Japanese superfoods for a dewy, healthy glow.' },
  { brand: "Paula's Choice", name: 'Skin Perfecting 2% BHA Liquid Exfoliant', basePrice: 2950, desc: 'A leave-on exfoliant with salicylic acid that unclogs pores, smooths wrinkles, and evens skin tone.' },
  { brand: 'Minimalist', name: 'Salicylic Acid 2% Face Serum', basePrice: 545, desc: 'A gentle exfoliating serum that helps reduce acne, blackheads, and enlarged pores.' },
  { brand: 'Dot & Key', name: 'Vitamin C + E Super Bright Moisturizer', basePrice: 695, desc: 'A glow-boosting moisturizer with vitamin C, E, and niacinamide for radiant, even-toned skin.' },
  { brand: 'Forest Essentials', name: 'Soundarya Radiance Cream', basePrice: 4475, desc: 'A luxurious Ayurvedic cream with 24K gold and SPF 25 for youthful, radiant skin.' },
  { brand: "Kiehl's", name: 'Ultra Facial Cream', basePrice: 3100, desc: 'A lightweight yet powerful 24-hour daily facial moisturizer for all skin types.' },
  { brand: 'Laneige', name: 'Water Sleeping Mask', basePrice: 1750, desc: 'An overnight mask that replenishes moisture and purifies skin for a radiant morning glow.' },
  { brand: 'Innisfree', name: 'Green Tea Seed Serum', basePrice: 1350, desc: 'A hydrating serum with Jeju green tea that keeps skin moisturized and smooth.' },
  { brand: 'Plum', name: 'Green Tea Pore Cleansing Face Wash', basePrice: 345, desc: 'A gentle, soap-free face wash with green tea extracts that controls excess oil.' },
  { brand: 'Biotique', name: 'Bio Aloe Vera Face Wash', basePrice: 199, desc: 'A refreshing gel face wash with pure aloe vera for clean, clear, and supple skin.' },
]

const fragrancesData: FragranceTemplate[] = [
  { brand: 'Tom Ford', name: 'Lost Cherry', basePrice: 25000, notes: { top: ['Cherry', 'Almond'], middle: ['Cherry Liqueur', 'Turkish Rose', 'Jasmine'], base: ['Tonka Bean', 'Sandalwood', 'Vanilla'] }, longevity: '8-10 hours', projection: 'Moderate to Heavy', desc: 'A heady, seductive cherry fragrance layered with almond, rose, and deep woody notes.' },
  { brand: 'Tom Ford', name: 'Tobacco Vanille', basePrice: 25000, notes: { top: ['Tobacco Leaf', 'Spicy'], middle: ['Vanilla', 'Cacao', 'Tonka Bean'], base: ['Dried Fruits', 'Woody'] }, longevity: '10-12 hours', projection: 'Heavy', desc: 'An opulent, warm fragrance with rich tobacco leaf and aromatic spices blended with vanilla.' },
  { brand: 'Dior', name: 'Sauvage Eau de Parfum', basePrice: 8500, notes: { top: ['Bergamot', 'Pepper'], middle: ['Lavender', 'Sichuan Pepper', 'Star Anise'], base: ['Ambroxan', 'Cedar', 'Labdanum'] }, longevity: '8-10 hours', projection: 'Heavy', desc: 'A powerful, noble raw material blend of wild, woody, and spicy accords.' },
  { brand: 'Chanel', name: 'Bleu de Chanel EDP', basePrice: 9800, notes: { top: ['Citrus', 'Mint'], middle: ['Grapefruit', 'Dry Cedar'], base: ['Sandalwood', 'Tonka Bean', 'Amber'] }, longevity: '8-10 hours', projection: 'Moderate', desc: 'A woody, aromatic fragrance that reveals the spirit of a man who chooses his own destiny.' },
  { brand: 'Yves Saint Laurent', name: 'Black Opium EDP', basePrice: 7500, notes: { top: ['Pear', 'Pink Pepper'], middle: ['Coffee', 'Orange Blossom', 'Jasmine'], base: ['Vanilla', 'Patchouli', 'Cedar'] }, longevity: '7-9 hours', projection: 'Moderate', desc: 'An addictive feminine fragrance with coffee and vanilla for a glamorous, rock-chic allure.' },
  { brand: 'Jo Malone', name: 'English Pear & Freesia', basePrice: 11500, notes: { top: ['King William Pear'], middle: ['Freesia'], base: ['Patchouli', 'Amber'] }, longevity: '4-6 hours', projection: 'Light', desc: 'A sophisticated fruity fragrance capturing the essence of luscious pears and freesia.' },
  { brand: 'Versace', name: 'Eros EDT', basePrice: 5500, notes: { top: ['Mint', 'Apple', 'Lemon'], middle: ['Tonka Bean', 'Ambroxan', 'Geranium'], base: ['Vanilla', 'Vetiver', 'Oak Moss', 'Cedar'] }, longevity: '6-8 hours', projection: 'Heavy', desc: 'A fragrance for a strong, passionate man inspired by Greek mythology.' },
  { brand: 'Gucci', name: 'Bloom EDP', basePrice: 8200, notes: { top: ['Natural Tuberose', 'Jasmine'], middle: ['Rangoon Creeper'], base: ['Orris'] }, longevity: '6-8 hours', projection: 'Moderate', desc: 'A rich, white floral scent that captures the essence of a thriving garden.' },
  { brand: 'Creed', name: 'Aventus', basePrice: 32000, notes: { top: ['Pineapple', 'Bergamot', 'Apple', 'Blackcurrant'], middle: ['Birch', 'Patchouli', 'Jasmine', 'Rose'], base: ['Musk', 'Oak Moss', 'Ambergris', 'Vanilla'] }, longevity: '8-12 hours', projection: 'Heavy', desc: 'An iconic, bold fragrance celebrating strength, power, and success.' },
  { brand: 'Maison Margiela', name: 'Replica By The Fireplace', basePrice: 10500, notes: { top: ['Clove Oil', 'Pink Pepper', 'Orange'], middle: ['Chestnut', 'Guaiac Wood'], base: ['Vanilla', 'Cashmeran', 'Peru Balsam'] }, longevity: '6-8 hours', projection: 'Moderate', desc: 'A cozy fragrance evoking the warmth of chestnuts crackling by the fireplace.' },
  { brand: 'Armani', name: 'Acqua Di Gio Profumo', basePrice: 7200, notes: { top: ['Bergamot', 'Sea Notes'], middle: ['Geranium', 'Rosemary', 'Sage'], base: ['Patchouli', 'Amber', 'Incense'] }, longevity: '8-10 hours', projection: 'Moderate to Heavy', desc: 'A refined, masculine aquatic fragrance with a deep amber heart.' },
  { brand: 'Bvlgari', name: 'Omnia Crystalline EDT', basePrice: 5800, notes: { top: ['Bamboo', 'Nashi Pear'], middle: ['Lotus', 'Balsa Wood'], base: ['Musk', 'Cedar'] }, longevity: '4-6 hours', projection: 'Light', desc: 'A crystal-clear, luminous floral fragrance inspired by pure light and clarity.' },
  { brand: 'Carolina Herrera', name: 'Good Girl EDP', basePrice: 7800, notes: { top: ['Almond', 'Coffee'], middle: ['Tuberose', 'Jasmine', 'Sambac'], base: ['Cocoa', 'Tonka Bean', 'Sandalwood'] }, longevity: '7-9 hours', projection: 'Moderate to Heavy', desc: 'A daring, sensual fragrance that captures the dual nature of modern femininity.' },
  { brand: 'Dolce & Gabbana', name: 'Light Blue EDT', basePrice: 5200, notes: { top: ['Sicilian Lemon', 'Apple', 'Bluebell'], middle: ['Jasmine', 'Bamboo', 'White Rose'], base: ['Cedar', 'Musk', 'Amber'] }, longevity: '4-6 hours', projection: 'Light to Moderate', desc: 'A fresh, Mediterranean fragrance capturing the sensuality of Italian summer.' },
  { brand: 'Lattafa', name: 'Raghba EDP', basePrice: 1200, notes: { top: ['Saffron', 'Incense'], middle: ['Oud', 'Rose'], base: ['Musk', 'Vanilla', 'Amber'] }, longevity: '8-12 hours', projection: 'Heavy', desc: 'A rich, oriental fragrance with oud and saffron that projects beautifully.' },
  { brand: 'Ajmal', name: 'Aurum EDP', basePrice: 2800, notes: { top: ['Raspberry', 'Bergamot', 'Peach'], middle: ['Gardenia', 'Lily of the Valley', 'Jasmine'], base: ['Patchouli', 'Sandalwood', 'Musk'] }, longevity: '6-8 hours', projection: 'Moderate', desc: 'A luminous floral-fruity fragrance symbolizing the essence of gold.' },
]

const eyeProducts: SingleTemplate[] = [
  { brand: 'Urban Decay', name: 'Naked3 Eyeshadow Palette', shade: '12 Rose-Hued Shades', basePrice: 4500, desc: 'An iconic palette with 12 rose-hued, neutral shades in matte and shimmer finishes.' },
  { brand: 'Too Faced', name: 'Better Than Sex Mascara', shade: 'Black', basePrice: 2500, desc: 'A collagen-fueled lash-boosting mascara with an hourglass-shaped brush for intense volume.' },
  { brand: 'Benefit', name: 'BADgal BANG! Volumizing Mascara', shade: 'Black', basePrice: 2700, desc: 'A gravity-defying volumizing mascara with aero-particles for massive, full lashes.' },
  { brand: 'Huda Beauty', name: 'Naughty Nude Eyeshadow Palette', shade: '18 Nude Tones', basePrice: 5500, desc: '18 wearable nude shades spanning creamy mattes, buttery metallics, and multi-chrome glitters.' },
  { brand: 'Lakme', name: 'Eyeconic Kajal', shade: 'Black', basePrice: 199, desc: 'A smudge-proof, long-lasting kajal with intense black pigment for dramatic eyes.' },
  { brand: 'Maybelline', name: 'Colossal Kajal', shade: 'Super Black', basePrice: 299, desc: 'An ultra-rich kajal with a creamy formula for intense, smudge-proof eye definition.' },
  { brand: 'Charlotte Tilbury', name: 'Pillow Talk Push Up Lashes Mascara', shade: 'Dream Pop Black', basePrice: 3200, desc: 'A volumizing and lengthening mascara with a heart-shaped brush for lifted, fuller lashes.' },
  { brand: 'Bobbi Brown', name: 'Long-Wear Gel Eyeliner', shade: 'Black Ink', basePrice: 2800, desc: 'A waterproof gel eyeliner that glides on smoothly and stays put for 12+ hours.' },
]

const blushContourShades: ShadeTemplate[] = [
  { brand: 'NARS', name: 'Blush', shades: ['Orgasm', 'Deep Throat', 'Sin', 'Amour', 'Seduction'], basePrice: 3300, desc: 'A buildable, blendable powder blush in a range of universally flattering shades.' },
  { brand: 'Charlotte Tilbury', name: 'Flawless Filter', shades: ['1 Fair', '2 Light', '3 Light Medium', '4 Medium', '5 Medium Tan', '6 Deep'], basePrice: 4200, desc: 'A skin-smoothing, Hollywood-inspired complexion booster for a real-life filter effect.' },
  { brand: 'Rare Beauty', name: 'Soft Pinch Liquid Blush', shades: ['Joy', 'Happy', 'Hope', 'Bliss', 'Grace', 'Love'], basePrice: 2400, desc: 'A weightless, long-lasting liquid blush with a soft, buildable, natural-looking flush.' },
  { brand: 'Fenty Beauty', name: 'Sun Stalker Bronzer', shades: ['Shady Biz', 'Inda Sun', 'Mocha Mami', 'Coco Naughty'], basePrice: 3100, desc: 'A creamy, blendable powder bronzer for a warm, sun-drenched glow.' },
]

const blushContourSingles: SingleTemplate[] = [
  { brand: 'Benefit', name: 'Hoola Matte Bronzer', shade: 'Hoola', basePrice: 3200, desc: 'An award-winning matte bronzer for a natural, sun-kissed glow on all skin tones.' },
]

const primerSetting: SingleTemplate[] = [
  { brand: 'Smashbox', name: 'Photo Finish Foundation Primer', basePrice: 3400, desc: 'A silky, oil-free primer that smooths skin, minimizes pores, and extends makeup wear.' },
  { brand: 'e.l.f.', name: 'Poreless Putty Primer', basePrice: 850, desc: 'A silicone-based, squalane-infused primer that smooths and grips makeup for all-day wear.' },
  { brand: 'MAC', name: 'Prep + Prime Fix+', basePrice: 2200, desc: 'A lightweight spray that refreshes, finishes, and sets makeup with a dewy, radiant look.' },
  { brand: 'Urban Decay', name: 'All Nighter Setting Spray', basePrice: 3100, desc: 'A setting spray that locks makeup in place for up to 16 hours with a temperature-control technology.' },
  { brand: 'NYX', name: 'Matte Finish Setting Spray', basePrice: 750, desc: 'A lightweight, micro-fine mist that sets makeup and reduces shine for a matte finish.' },
  { brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Setting Spray', basePrice: 3500, desc: 'A long-lasting, hydrating setting spray for a flawless, poreless-looking finish up to 16 hours.' },
]

// ---- build catalog ----
let productId = 1
const products: Product[] = []

function addShadeProduct(item: ShadeTemplate, category: string) {
  for (const shade of item.shades) {
    products.push({
      id: productId++,
      brand: item.brand,
      productName: item.name,
      category,
      shade,
      description: item.desc,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
      fallbackCategoryImage: categoryFallbackImages[category] || categoryFallbackImages['default'],
      sellerListings: generateSellerListings(item.basePrice),
      equivalentProducts: [],
      fragranceProfile: null,
    })
  }
}

function addSingleProduct(item: SingleTemplate, category: string) {
  products.push({
    id: productId++,
    brand: item.brand,
    productName: item.name,
    category,
    shade: item.shade || null,
    description: item.desc,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    fallbackCategoryImage: categoryFallbackImages[category] || categoryFallbackImages['default'],
    sellerListings: generateSellerListings(item.basePrice),
    equivalentProducts: [],
    fragranceProfile: null,
  })
}

for (const f of foundations) addShadeProduct(f, 'Foundation')
for (const c of concealers) addShadeProduct(c, 'Concealer')
for (const l of lipsticks) addShadeProduct(l, 'Lipstick')
for (const s of skincareItems) addSingleProduct(s, 'Skincare')
for (const e of eyeProducts) addSingleProduct(e, 'Eye')
for (const b of blushContourShades) addShadeProduct(b, 'Blush & Contour')
for (const b of blushContourSingles) addSingleProduct(b, 'Blush & Contour')
for (const p of primerSetting) addSingleProduct(p, 'Primer & Setting')
for (const f of fragrancesData) {
  products.push({
    id: productId++,
    brand: f.brand,
    productName: f.name,
    category: 'Fragrance',
    shade: null,
    description: f.desc,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    fallbackCategoryImage: categoryFallbackImages['Fragrance'],
    sellerListings: generateSellerListings(f.basePrice),
    equivalentProducts: [],
    fragranceProfile: {
      notes: f.notes,
      longevity: f.longevity,
      projection: f.projection,
    },
  })
}

// ---- wire equivalents ----
function findByBrandName(brand: string, name: string) {
  return products.find((p) => p.brand === brand && p.productName === name)
}

function wireEquivalents(groups: [string, string][][]) {
  for (const group of groups) {
    const items = group
      .map(([b, n]) => findByBrandName(b, n))
      .filter(Boolean) as Product[]
    for (const item of items) {
      item.equivalentProducts = items
        .filter((x) => x.id !== item.id)
        .map((x) => ({
          id: x.id,
          brand: x.brand,
          productName: x.productName,
        }))
    }
  }
}

wireEquivalents([
  [
    ['Estee Lauder', 'Double Wear Stay-in-Place Foundation'],
    ['MAC', 'Studio Fix Fluid SPF 15'],
    ['NARS', 'Natural Radiant Longwear Foundation'],
    ['Dior', 'Forever Skin Glow Foundation'],
  ],
  [
    ['Maybelline', 'Fit Me Matte + Poreless Foundation'],
    ['LOreal Paris', 'Infallible 24H Fresh Wear Foundation'],
    ['Lakme', 'Perfecting Liquid Foundation'],
  ],
  [
    ['Charlotte Tilbury', 'Airbrush Flawless Foundation'],
    ['Bobbi Brown', 'Skin Long-Wear Weightless Foundation SPF 15'],
    ['Fenty Beauty', 'Pro Filtr Soft Matte Longwear Foundation'],
  ],
])

wireEquivalents([
  [
    ['MAC', 'Matte Lipstick'],
    ['Charlotte Tilbury', 'Matte Revolution Lipstick'],
    ['NARS', 'Audacious Lipstick'],
    ['Dior', 'Rouge Dior Lipstick'],
  ],
  [
    ['Maybelline', 'Super Stay Matte Ink'],
    ['Lakme', '9to5 Primer + Matte Lip Color'],
    ['Fenty Beauty', 'Stunna Lip Paint'],
  ],
])

wireEquivalents([
  [
    ['Dior', 'Sauvage Eau de Parfum'],
    ['Chanel', 'Bleu de Chanel EDP'],
    ['Versace', 'Eros EDT'],
    ['Armani', 'Acqua Di Gio Profumo'],
  ],
  [
    ['Jo Malone', 'English Pear & Freesia'],
    ['Dolce & Gabbana', 'Light Blue EDT'],
    ['Bvlgari', 'Omnia Crystalline EDT'],
  ],
  [
    ['Creed', 'Aventus'],
    ['Tom Ford', 'Tobacco Vanille'],
  ],
  [
    ['Lattafa', 'Raghba EDP'],
    ['Ajmal', 'Aurum EDP'],
  ],
])

wireEquivalents([
  [
    ['NARS', 'Radiant Creamy Concealer'],
    ['Maybelline', 'Instant Age Rewind Concealer'],
    ['MAC', 'Studio Fix 24-Hour Smooth Wear Concealer'],
    ['Too Faced', 'Born This Way Super Coverage Concealer'],
    ['Tarte', 'Shape Tape Full Coverage Concealer'],
    ['Charlotte Tilbury', 'Beautiful Skin Radiant Concealer'],
  ],
])

wireEquivalents([
  [
    ['CeraVe', 'Hydrating Facial Cleanser'],
    ['Plum', 'Green Tea Pore Cleansing Face Wash'],
    ['Biotique', 'Bio Aloe Vera Face Wash'],
  ],
  [
    ['The Ordinary', 'Niacinamide 10% + Zinc 1%'],
    ['Minimalist', 'Salicylic Acid 2% Face Serum'],
    ["Paula's Choice", 'Skin Perfecting 2% BHA Liquid Exfoliant'],
  ],
  [
    ['Neutrogena', 'Hydro Boost Water Gel'],
    ['Clinique', 'Moisture Surge 100H Auto-Replenishing Hydrator'],
    ["Kiehl's", 'Ultra Facial Cream'],
    ['Olay', 'Regenerist Micro-Sculpting Cream'],
  ],
  [
    ['SK-II', 'Facial Treatment Essence'],
    ['Tatcha', 'The Dewy Skin Cream'],
    ['Forest Essentials', 'Soundarya Radiance Cream'],
  ],
  [
    ['Laneige', 'Water Sleeping Mask'],
    ['Innisfree', 'Green Tea Seed Serum'],
    ['Dot & Key', 'Vitamin C + E Super Bright Moisturizer'],
  ],
])

wireEquivalents([
  [
    ['Rare Beauty', 'Soft Pinch Liquid Blush'],
    ['NARS', 'Blush'],
  ],
  [
    ['Benefit', 'Hoola Matte Bronzer'],
    ['Fenty Beauty', 'Sun Stalker Bronzer'],
  ],
])

export const catalog: Product[] = products

export function getProductById(id: number): Product | undefined {
  return catalog.find((p) => p.id === id)
}

export function getUniqueProducts(): Product[] {
  const seen = new Set<string>()
  return catalog.filter((p) => {
    const key = `${p.brand}::${p.productName}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function searchProducts(
  query: string,
  category?: string,
  brand?: string
): Product[] {
  const q = query.toLowerCase().trim()

  // If searching for a specific shade, search all products (including shade variants)
  const isShadeSearch = q && catalog.some(
    (p) => p.shade && p.shade.toLowerCase().includes(q)
  )

  let results: Product[] = isShadeSearch ? [...catalog] : getUniqueProducts()

  if (category && category !== 'All') {
    results = results.filter((p) => p.category === category)
  }

  if (brand) {
    results = results.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    )
  }

  if (q) {
    results = results.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) ||
        p.productName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.shade && p.shade.toLowerCase().includes(q))
    )
  }

  return results
}

export function getProductShades(brand: string, productName: string): Product[] {
  return catalog.filter(
    (p) => p.brand === brand && p.productName === productName
  )
}

export function getAllBrands(): string[] {
  return [...new Set(catalog.map((p) => p.brand))].sort()
}

export function getAllCategories(): string[] {
  return [...new Set(catalog.map((p) => p.category))].sort()
}

export function getLowestPrice(product: Product): number {
  if (!product?.sellerListings?.length) return 0
  const inStock = product.sellerListings.filter(
    (s) => s.availability === 'In Stock'
  )
  if (inStock.length === 0) {
    // Fall back to all listings if none in stock
    return Math.min(...product.sellerListings.map((s) => s.price))
  }
  return Math.min(...inStock.map((s) => s.price))
}

export function getHighestPrice(product: Product): number {
  if (!product?.sellerListings?.length) return 0
  const inStock = product.sellerListings.filter(
    (s) => s.availability === 'In Stock'
  )
  if (inStock.length === 0) {
    return Math.max(...product.sellerListings.map((s) => s.price))
  }
  return Math.max(...inStock.map((s) => s.price))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

// ---- smart equivalent matching ----

export function getEquivalentSectionInfo(category: string): {
  title: string
  description: string
} {
  switch (category) {
    case 'Foundation':
    case 'Concealer':
      return {
        title: 'Shade Equivalents',
        description:
          'Comparable shades across brands with similar undertone, finish, and coverage.',
      }
    case 'Lipstick':
      return {
        title: 'Similar Shades',
        description:
          'Closest matching shades across brands with similar tone and finish.',
      }
    case 'Fragrance':
      return {
        title: 'Fragrance Matches',
        description:
          'Similar scent profiles and dupe-like alternatives based on notes and fragrance family.',
      }
    case 'Eye':
    case 'Blush & Contour':
      return {
        title: 'Similar Shades',
        description:
          'Closest matching products across brands with similar tone and finish.',
      }
    default:
      return {
        title: 'Related Alternatives',
        description: 'Comparable alternatives in the same category.',
      }
  }
}

/**
 * Smart matching: returns the best equivalent products for a given product,
 * using category-specific logic instead of generic grouping.
 */
export function getSmartEquivalents(product: Product, limit = 6): Product[] {
  const unique = getUniqueProducts().filter(
    (p) => p.brand !== product.brand || p.productName !== product.productName
  )

  switch (product.category) {
    case 'Foundation':
    case 'Concealer':
      return matchByShade(product, unique, limit)
    case 'Lipstick':
      return matchByColorFamily(product, unique, limit)
    case 'Fragrance':
      return matchByFragranceNotes(product, unique, limit)
    case 'Eye':
    case 'Blush & Contour':
      return matchByColorFamily(product, unique, limit)
    default:
      return matchByCategory(product, unique, limit)
  }
}

// ---- shade-based matching (foundation / concealer) ----

function parseShadeDepth(shade: string | null): number {
  if (!shade) return 5
  const s = shade.toLowerCase()
  // Check numeric prefixes
  const numMatch = s.match(/^(\d+)/)
  if (numMatch) return Math.min(10, Math.max(1, Math.round(parseInt(numMatch[1]) / 5)))
  // Named depth keywords
  if (/fair|porcelain|ivory|light|blanc|chantilly/.test(s)) return 2
  if (/sand|vanilla|beige|nude|natural|custard/.test(s)) return 4
  if (/medium|warm|tawny|honey|ginger/.test(s)) return 6
  if (/tan|caramel|bronze|amande|mocha/.test(s)) return 7
  if (/deep|dark|cocoa|espresso|sandalwood|cafe/.test(s)) return 9
  return 5
}

function parseUndertone(shade: string | null): string {
  if (!shade) return 'neutral'
  const s = shade.toLowerCase()
  if (/\bw\b|warm|golden|yellow|tawny|honey|bronze/.test(s)) return 'warm'
  if (/\bc\b|cool|pink|rose|ivory/.test(s)) return 'cool'
  return 'neutral'
}

function matchByShade(product: Product, pool: Product[], limit: number): Product[] {
  const sameCat = pool.filter((p) => p.category === product.category)
  const depth = parseShadeDepth(product.shade)
  const undertone = parseUndertone(product.shade)

  const scored = sameCat.map((p) => {
    const pDepth = parseShadeDepth(p.shade)
    const pUndertone = parseUndertone(p.shade)
    let score = 0
    // Depth closeness (max 5)
    score += 5 - Math.abs(depth - pDepth)
    // Undertone match (3 pts for exact, 1 for neutral match)
    if (pUndertone === undertone) score += 3
    else if (pUndertone === 'neutral' || undertone === 'neutral') score += 1
    // Different brand bonus (prefer cross-brand)
    if (p.brand !== product.brand) score += 2
    return { product: p, score }
  })

  scored.sort((a, b) => b.score - a.score)
  // Deduplicate by brand+name
  const seen = new Set<string>()
  const results: Product[] = []
  for (const { product: p } of scored) {
    const key = `${p.brand}::${p.productName}`
    if (seen.has(key)) continue
    seen.add(key)
    results.push(p)
    if (results.length >= limit) break
  }
  return results
}

// ---- fragrance note-based matching ----

function matchByFragranceNotes(product: Product, pool: Product[], limit: number): Product[] {
  const fragrances = pool.filter((p) => p.category === 'Fragrance' && p.fragranceProfile)
  if (!product.fragranceProfile) {
    return matchByCategory(product, pool, limit)
  }
  const myNotes = [
    ...product.fragranceProfile.notes.top,
    ...product.fragranceProfile.notes.middle,
    ...product.fragranceProfile.notes.base,
  ].map((n) => n.toLowerCase())

  const scored = fragrances.map((p) => {
    const pNotes = [
      ...(p.fragranceProfile?.notes.top || []),
      ...(p.fragranceProfile?.notes.middle || []),
      ...(p.fragranceProfile?.notes.base || []),
    ].map((n) => n.toLowerCase())

    let score = 0
    // Count overlapping notes
    const overlap = myNotes.filter((n) => pNotes.some((pn) => pn.includes(n) || n.includes(pn)))
    score += overlap.length * 2

    // Longevity similarity
    if (product.fragranceProfile!.longevity === p.fragranceProfile?.longevity) score += 2

    // Projection similarity
    if (product.fragranceProfile!.projection === p.fragranceProfile?.projection) score += 1

    // Cross-brand bonus
    if (p.brand !== product.brand) score += 1

    return { product: p, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const seen = new Set<string>()
  const results: Product[] = []
  for (const { product: p } of scored) {
    const key = `${p.brand}::${p.productName}`
    if (seen.has(key)) continue
    seen.add(key)
    results.push(p)
    if (results.length >= limit) break
  }
  return results
}

// ---- color family matching (lipstick, eye, blush) ----

function getColorFamily(shade: string | null, name: string): string {
  const s = (shade || name).toLowerCase()
  if (/red|ruby|crimson|scarlet|cherry|chili|fire/.test(s)) return 'red'
  if (/pink|rose|blush|fuchsia|mauve|magenta/.test(s)) return 'pink'
  if (/nude|beige|neutral|natural|vanilla|velvet teddy/.test(s)) return 'nude'
  if (/brown|mocha|cocoa|chocolate|toffee|caramel|coffee|marrakesh/.test(s)) return 'brown'
  if (/plum|berry|wine|diva|burgundy|maroon|mehr/.test(s)) return 'plum'
  if (/coral|peach|orange|sunset/.test(s)) return 'coral'
  if (/black|dark|deep|ink/.test(s)) return 'dark'
  if (/gold|shimmer|bronze|glow/.test(s)) return 'shimmer'
  return 'neutral'
}

function matchByColorFamily(product: Product, pool: Product[], limit: number): Product[] {
  const sameCat = pool.filter((p) => p.category === product.category)
  const myColor = getColorFamily(product.shade, product.productName)

  const scored = sameCat.map((p) => {
    const pColor = getColorFamily(p.shade, p.productName)
    let score = 0
    if (pColor === myColor) score += 5
    // Similar families get partial credit
    const families: Record<string, string[]> = {
      red: ['pink', 'coral', 'plum'],
      pink: ['red', 'coral', 'nude'],
      nude: ['pink', 'brown', 'coral'],
      brown: ['nude', 'plum'],
      plum: ['red', 'brown'],
      coral: ['pink', 'red', 'nude'],
    }
    if (families[myColor]?.includes(pColor)) score += 2
    if (p.brand !== product.brand) score += 2
    return { product: p, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const seen = new Set<string>()
  const results: Product[] = []
  for (const { product: p } of scored) {
    const key = `${p.brand}::${p.productName}`
    if (seen.has(key)) continue
    seen.add(key)
    results.push(p)
    if (results.length >= limit) break
  }
  return results
}

// ---- generic category fallback ----

function matchByCategory(product: Product, pool: Product[], limit: number): Product[] {
  const sameCat = pool.filter((p) => p.category === product.category)
  // Sort by price proximity
  const myPrice = getLowestPrice(product)
  sameCat.sort(
    (a, b) =>
      Math.abs(getLowestPrice(a) - myPrice) - Math.abs(getLowestPrice(b) - myPrice)
  )
  const seen = new Set<string>()
  const results: Product[] = []
  for (const p of sameCat) {
    const key = `${p.brand}::${p.productName}`
    if (seen.has(key)) continue
    seen.add(key)
    results.push(p)
    if (results.length >= limit) break
  }
  return results
}
