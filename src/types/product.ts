import { MeLiked } from "./user";

export interface Product {
  _id: string;
  product_name: string;
  product_collection: string;
  product_status: string;
  product_price: number;
  product_discount?: number;
  product_left_cnt: number;
  product_size?: string;
  product_color?: string;
  product_description: string;
  product_images: string[];
  seller_mb_id: string;
  product_views?: number;
  product_likes?: number;
  createdAt: Date;
  updatedAt: Date;
  me_liked: MeLiked[];
}
