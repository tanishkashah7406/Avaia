export interface SellerListing {
  sellerName: string
  price: number
  deliveryEstimate: string
  availability: string
  offerBadge: string | null
  verified: boolean
}

export interface FragranceProfile {
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  longevity: string
  projection: string
}

export interface EquivalentRef {
  id: number
  brand: string
  productName: string
}

export interface Product {
  id: number
  brand: string
  productName: string
  category: string
  shade: string | null
  description: string
  image: string | null
  fallbackCategoryImage: string
  sellerListings: SellerListing[]
  equivalentProducts: EquivalentRef[]
  fragranceProfile: FragranceProfile | null
}

export type Category =
  | 'All'
  | 'Foundation'
  | 'Concealer'
  | 'Lipstick'
  | 'Skincare'
  | 'Fragrance'
  | 'Eye'
  | 'Blush & Contour'
  | 'Primer & Setting'
