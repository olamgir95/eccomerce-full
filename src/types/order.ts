import { Product } from "./product";

export interface OrderItem {
  _id: string;
  item_quantity: number;
  item_price: number;
  order_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  order_total_amount: number;
  order_delivery_cost: number;
  mb_id: string;
  order_status: string;
  createdAt: Date;
  updatedAt: Date;
  //aggregations
  order_items: OrderItem[];
  product_data: Product[];
}
