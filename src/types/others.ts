import { MeLiked, Member } from "./user";

export interface SearchObj {
  page: number;
  limit: number;
  order: string;
}

export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  seller_mb_id?: string;
  product_collection?: string;
  product_color?: string;
  product_price_min?: number;
  product_price_max?: number;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  sale_price: number | undefined;
  image: string;
  name: string;
}

export interface ChatMessage {
  msg: string;
  mb_id: string;
  mb_nick: string;
  mb_image: string;
}

export interface ChatGreetMsg {
  text: string;
}

export interface ChatInfoUsers {
  total: number;
}

export interface NewMessageProps {
  data: ChatMessage;
  key: number;
}

export interface Comment {
  _id: string;
  comment_content: string;
  comment_group: string;
  comment_likes: number;
  comment_owner: Member;
  comment_ref_id: string;
  comment_stars: number;
  me_liked: MeLiked[];
  mb_id: string;
  comment_replies: CommentReply;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentReply {
  _id: string;
  reply_comment_id: string;
  reply_content: string;
  reply_owner: Member;
  createdAt: Date;
  updatedAt: Date;
}
