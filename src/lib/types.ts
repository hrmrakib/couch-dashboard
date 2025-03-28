export type ProductStatus = "pending" | "confirm" | "cancel"

export interface ProductDetails {
  model: string
  storage: string
  condition: string
  controller: number
}

export interface Seller {
  name: string
  date: string
  accountNumber: string
  phone: string
  email: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  seller: Seller
  status: ProductStatus
  details: ProductDetails
}

