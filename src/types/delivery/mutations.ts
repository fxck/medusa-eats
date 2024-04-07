export interface CreateDeliveryDTO {
  restaurant_id: string
  cart_id: string
  delivery_address: string
}

export interface UpdateDeliveryDTO {
  driver_id?: string
  order_id?: string
  cart_id?: string | null
  delivery_status?:
    | "pending"
    | "declined"
    | "accepted"
    | "ready_for_pickup"
    | "in_transit"
    | "delivered"
  delivery_address?: string
  eta?: Date
  delivered_at?: Date
}

export interface CreateDriverDTO {
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar_url?: string
}

export type UpdateDriverDTO = Partial<CreateDriverDTO>